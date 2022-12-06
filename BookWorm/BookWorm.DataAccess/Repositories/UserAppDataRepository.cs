using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.DataAccess.Data;
using BookWorm.DataAccess.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.DataAccess.Repositories
{
  public class UserAppDataRepository : IUserAppDataRepository
  {
    private readonly ApplicationDbContext _context;
    private readonly UserManager<Data.Models.ApplicationUser> _userManager;
    private IHttpContextAccessor _httpContextAccessor;
    public UserAppDataRepository(ApplicationDbContext context, UserManager<Data.Models.ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
    {
      _context = context;
      _userManager = userManager;
      _httpContextAccessor = httpContextAccessor;
    }

    public async Task<BusinessLogic.Data.Models.UserAppData> GetAppDataAsync(string userId)
    {
      var data = _context.UserAppData.Include(uad => uad.ApplictionUser).Include(uad => uad.ReadingList).Include(uad => uad.BookShelfs).ThenInclude(b => b.Books).Where(u => u.UserId == userId).FirstOrDefault();
      if (data == null)
      {
        var user = await _userManager.FindByIdAsync(userId);
        data = CreateAndSaveDefaultUserData(user);
      }

      List<BusinessLogic.Data.Models.BookShelf> bs = ConvertBookSelves(data.BookShelfs);
      return new BusinessLogic.Data.Models.UserAppData()
      {
        UserId = data.UserId,
        Description = data.Description,
        DisplayName = data.ApplictionUser.DisplayedName,
        Likes = data.PreferedTypes.Select(pt => pt.Type).ToList(),
        Img = data.ApplictionUser.ProfileImgUrl,
        Readings = data.ReadingList.Select(rr => new BusinessLogic.Data.Models.ReadingRecord(data.UserId, rr.IsMyCopy, rr.IsCurrentReading, rr.BookId, rr.StartTime, rr.EndTime)).ToList(),
        BookShelves = bs
      };
    }

    private List<BusinessLogic.Data.Models.BookShelf> ConvertBookSelves(List<Data.Models.BookShelf> bookShelfs)
    {
      return bookShelfs.Select(bs => new BusinessLogic.Data.Models.BookShelf()
      {
        IconURL = bs.IconURL,
        ID = bs.ID,
        IsPrivate = bs.IsPrivate,
        IsWishlist = bs.IsWhislist,
        Name = bs.Name,
        OwnerId = bs.OwnerId,
        BookIds = bs.Books.Select(b => b.Id).ToList(),
      }).ToList();
    }

    public async Task<int> SaveBookToReadingListAsync(BusinessLogic.Data.Models.ReadingRecord readingRecord)
    {
      var user = await _userManager.FindByIdAsync(readingRecord.UserId);
      if (user == null) return -1;

      //Check if UserAppData with userid exists if not create and save
      var userAppData = _context.UserAppData.Where(u => u.UserId == user.Id).FirstOrDefault();
      int userId;
      if (userAppData == null)
      {
        userId = CreateAndSaveDefaultUserData(user).ID;
      }
      else
      {
        userId = userAppData.ID;
      }

      var startTimeIfCurrentReading = readingRecord.IsCurrentReading && readingRecord.StartTime == null ? DateTime.Now : readingRecord.StartTime;
      //Save the ReadingRecord to db
      var record = new Data.Models.ReadingRecord()
      {
        BookId = readingRecord.BookId,
        OwnerId = userId,
        IsCurrentReading = readingRecord.IsCurrentReading,
        IsMyCopy = readingRecord.IsMyCopy,
        StartTime = startTimeIfCurrentReading,
        EndTime = readingRecord.EndTime
      };
      _context.ReadingRecord.Add(record);
      _context.SaveChanges();

      return record.ID;
    }

    public async Task<int> SaveBookToWishListAsync(string uid, string bookId)
    {
      var user = await _userManager.FindByIdAsync(uid);
      if (user == null) return -1;

      //Check if WishList with userid exists if not create and save
      var userAppData = _context.UserAppData.Include(bs => bs.BookShelfs).Where(u => u.UserId == user.Id).FirstOrDefault();
      var book = _context.Book.Where(b => b.Id == bookId).FirstOrDefault();


      if (userAppData == null)
      {
        userAppData = CreateAndSaveDefaultUserData(user);
      }

      Data.Models.BookShelf wishList = userAppData.BookShelfs.Where(bs => bs.IsWhislist == true).FirstOrDefault();

      if (wishList.Books == null)
      {
        wishList.Books = new List<Data.Models.Book>();
      }
      wishList.Books.Add(book);

      _context.SaveChanges();

      return wishList.ID;
    }

    private Data.Models.UserAppData CreateAndSaveDefaultUserData(Data.Models.ApplicationUser user)
    {
      var userAppData = new Data.Models.UserAppData()
      {
        Description = "",
        UserId = user.Id,
      };
      var wishList = new Data.Models.BookShelf() { IsPrivate = false, IconURL = "https://cdn-icons-png.flaticon.com/512/1632/1632670.png", IsWhislist = true, Name = "Wishlist", Books = new List<Data.Models.Book>() };
      userAppData.BookShelfs = new List<Data.Models.BookShelf>();
      userAppData.BookShelfs.Add(wishList);
      _context.UserAppData.Add(userAppData);
      _context.SaveChanges();
      return userAppData;
    }


    public async Task<bool> EditBio(string userId, string biotext)
    {
      var userAppData = _context.UserAppData.Where(u => u.UserId == userId).FirstOrDefault();
      if (userAppData == null) return false;

      userAppData.Description = biotext;
      _context.SaveChanges();

      return true;
    }

    public async Task<bool> EditPreferedTypes(string userId, BusinessLogic.Data.Models.PreferedType[] preferedTypes)
    {
      var userAppData = _context.UserAppData.Include(ud => ud.PreferedTypes).Where(u => u.UserId == userId).FirstOrDefault();
      if (userAppData == null) return false;

      userAppData.PreferedTypes = preferedTypes.Select(pt => new Data.Models.PreferedType() { Type = pt.Type }).ToList();
      _context.SaveChanges();

      return true;
    }

    public async Task<bool> RemoveReadingRecord(string? bookId, string userId)
    {
      var userAppData = _context.UserAppData.Include(ud => ud.ReadingList).Where(u => u.UserId == userId).FirstOrDefault();
      if (userAppData == null) return false;

      var toDelete = userAppData.ReadingList.Find(rr => rr.OwnerId == userAppData.ID && rr.BookId == bookId);
      if (toDelete == null) return false;

      _context.ReadingRecord.Remove(toDelete);
      _context.SaveChanges();

      return true;
    }

    public async Task<bool> FinishReading(string? bookId, string userId)
    {
      var userAppData = _context.UserAppData.Include(ud => ud.ReadingList).Where(u => u.UserId == userId).FirstOrDefault();
      if (userAppData == null) return false;

      var reading = userAppData.ReadingList.Find(rr => rr.OwnerId == userAppData.ID && rr.BookId == bookId);
      if (reading == null) return false;

      reading.IsCurrentReading = false;
      reading.EndTime = DateTime.Now;
      _context.SaveChanges();

      return true;
    }

    public async Task<bool> EditReadingRecord(BusinessLogic.Data.Models.ReadingRecord readingRecord)
    {
      var userAppData = _context.UserAppData.Include(ud => ud.ReadingList).Where(u => u.UserId == readingRecord.UserId).FirstOrDefault();
      if (userAppData == null) return false;

      var reading = userAppData.ReadingList.Find(rr => rr.OwnerId == userAppData.ID && rr.BookId == readingRecord.BookId);
      if (reading == null) return false;

      reading.IsCurrentReading = readingRecord.IsCurrentReading;
      reading.IsMyCopy = readingRecord.IsMyCopy;
      reading.StartTime = readingRecord.StartTime;
      reading.EndTime = readingRecord.EndTime;

      _context.SaveChanges();

      return true;
    }

    public async Task<BusinessLogic.Data.Models.ReadingRecord> GetReadingRecord(string? bookId, string userId)
    {
      var userAppData = _context.UserAppData.Include(ud => ud.ReadingList).Where(u => u.UserId == userId).FirstOrDefault();
      if (userAppData == null) return null;

      var reading = userAppData.ReadingList.Find(rr => rr.OwnerId == userAppData.ID && rr.BookId == bookId);
      if (reading == null) return null;

      return new BusinessLogic.Data.Models.ReadingRecord(userId, reading.IsMyCopy, reading.IsCurrentReading, reading.BookId, reading.StartTime, reading.EndTime);
    }

    public async Task<bool> RemoveBookFromWishList(string uid, string bookId)
    {
      var userAppData = _context.UserAppData.Include(bs => bs.BookShelfs).ThenInclude(b => b.Books).Where(u => u.UserId == uid).FirstOrDefault();
      if (userAppData == null) return false;

      Data.Models.BookShelf wishList = userAppData.BookShelfs.Where(bs => bs.IsWhislist == true).FirstOrDefault();

      Data.Models.Book toDelete = wishList.Books.Where(book => book.Id == bookId).FirstOrDefault();
      wishList.Books.Remove(toDelete);
      _context.SaveChanges();

      return true;
    }

    public async Task<IEnumerable<BusinessLogic.Data.Models.BookShelf>> GetShelvesAsync(string userId)
    {
      var data = _context.UserAppData
        .Include(uad => uad.ApplictionUser)
        .Include(uad => uad.BookShelfs)
        .ThenInclude(b => b.Books)
        .FirstOrDefault(u => u.UserId == userId);

      if (data == null) return null;

      var currentUserName = _httpContextAccessor.HttpContext?.User.Identities.First().Name;
      List<BusinessLogic.Data.Models.BookShelf> bs = ConvertBookSelves(data.BookShelfs);

      if (currentUserName != data.ApplictionUser.UserName)
      {
        bs = bs.Where(s => s.IsPrivate == false).ToList();
      }

      return bs;
    }

    public async Task<BusinessLogic.Data.Models.BookShelf> CreateShelf(BusinessLogic.Data.Models.BookShelf shelf)
    {
      //Check if WishList with userid exists if not create and save
      var userAppData = _context.UserAppData.Include(bs => bs.BookShelfs).Where(u => u.ID == shelf.OwnerId).FirstOrDefault();
      if (userAppData == null) return null;

      var newShelf = new Data.Models.BookShelf()
      {
        IconURL = shelf.IconURL == null ? String.Empty : shelf.IconURL,
        OwnerId = shelf.OwnerId,
        IsPrivate = shelf.IsPrivate,
        IsWhislist = false,
        Name = shelf.Name
      };
      _context.BookShelf.Add(newShelf);

      _context.SaveChanges();

      shelf.ID = newShelf.ID;
      shelf.IsWishlist = false;

      return shelf;
    }

    public async
        Task<int> SaveBookToShelf(string userId, int shelfId, string bookId)
    {
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null) return -1;

      //Check if Shelf with userid exists
      var userAppData = _context.UserAppData.Include(bs => bs.BookShelfs).ThenInclude(bs => bs.Books).Where(u => u.UserId == user.Id).FirstOrDefault();
      var shelf = userAppData?.BookShelfs.Where(bs => bs.ID == shelfId).FirstOrDefault();
      var book = _context.Book.Where(b => b.Id == bookId).FirstOrDefault();

      if (userAppData == null || shelf == null) return -1;

      if (shelf.Books == null)
      {
        shelf.Books = new List<Data.Models.Book>();
      }

      shelf.Books.Add(book);

      _context.SaveChanges();

      return shelf.ID;
    }

    public async Task<BusinessLogic.Data.Models.BookShelf> GetShelfAsync(int shelfId)
    {
      var shelf = _context.BookShelf.Include(bs => bs.Books).FirstOrDefault(s => s.ID == shelfId);

      return ConvertBookSelves(new List<Data.Models.BookShelf> { shelf }).First();
    }

    public async Task<int> EditShelf(BusinessLogic.Data.Models.BookShelf shelf)
    {
      var userAppData = _context.UserAppData.Include(bs => bs.BookShelfs).Where(u => u.ID == shelf.OwnerId).FirstOrDefault();
      var bookShelf = _context.BookShelf.Where(bs => bs.ID == shelf.ID).FirstOrDefault();

      if (userAppData == null || bookShelf == null) return -1;

      bookShelf.IsPrivate = shelf.IsPrivate;
      bookShelf.Name = shelf.Name;
      bookShelf.IconURL = shelf.IconURL;

      _context.SaveChanges();

      return bookShelf.ID;
    }

    public async Task<bool> RemoveShelf(int shelfId, string userId)
    {
      var userAppData = _context.UserAppData.Include(ud => ud.BookShelfs).Where(u => u.UserId == userId).FirstOrDefault();
      if (userAppData == null) return false;

      var toDelete = userAppData.BookShelfs.Find(bs => bs.ID == shelfId);
      if (toDelete == null) return false;

      _context.BookShelf.Remove(toDelete);
      _context.SaveChanges();

      return true;
    }

    public async Task<bool> CheckIfOwnShelfAsync(int shelfId)
    {
      var bookShelf = _context.BookShelf.Include(bs => bs.Owner).FirstOrDefault(bs => bs.ID == shelfId);
      if (bookShelf == null) return false;

      var currentUserName = _httpContextAccessor.HttpContext?.User.Identities.First().Name;
      var ownerUserId = bookShelf.Owner.UserId;
      var owner = await _userManager.FindByIdAsync(ownerUserId);

      return owner.UserName == currentUserName;
    }
  }
}
