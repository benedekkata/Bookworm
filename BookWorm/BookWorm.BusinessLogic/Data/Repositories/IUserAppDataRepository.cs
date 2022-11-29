using BookWorm.BusinessLogic.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Repositories
{
    public interface IUserAppDataRepository
    {
        Task<bool> CheckIfOwnShelfAsync(int shelfId);
        Task<BusinessLogic.Data.Models.BookShelf> CreateShelf(BookShelf shelf);
        Task<bool> EditBio(string userId, string biotext);
        Task<bool> EditPreferedTypes(string userId, PreferedType[] preferedTypes);
        Task<bool> EditReadingRecord(ReadingRecord readingRecord);
        Task<int> EditShelf(BookShelf shelf);
        Task<bool> FinishReading(string? bookId, string userId);
        Task<UserAppData> GetAppDataAsync(string userId);
        Task<ReadingRecord> GetReadingRecord(string? bookId, string userId);
        Task<BookShelf> GetShelfAsync(int shelfId);
        Task<IEnumerable<BookShelf>> GetShelvesAsync(string userId);
        Task<bool> RemoveBookFromWishList(string uid, string isbn);
        Task<bool> RemoveReadingRecord(string? bookId, string userId);
        Task<bool> RemoveShelf(int shelfId, string userId);
        Task<int> SaveBookToReadingListAsync(ReadingRecord readingRecord);
        Task<int> SaveBookToShelf(string userId, int shelfId, string bookId);
        Task<int> SaveBookToWishListAsync(string uid, string bookId);
    }
}
