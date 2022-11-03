using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.DataAccess.Data;
using BookWorm.DataAccess.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.DataAccess.Repositories
{
    public class UserAppDataRepository : IUserAppDataRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<Data.Models.ApplicationUser> _userManager;
        public UserAppDataRepository(ApplicationDbContext context, UserManager<Data.Models.ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<BusinessLogic.Data.Models.UserAppData> GetAppDataAsync(string userId)
        {
            var data = _context.UserAppData.Include(uad => uad.ApplictionUser).Include(uad => uad.ReadingList).Where(u => u.UserId == userId).FirstOrDefault();
            return new BusinessLogic.Data.Models.UserAppData()
            {
                UserId = data.UserId,
                Description = data.Description,
                DisplayName = data.ApplictionUser.DisplayedName,
                Likes = data.PreferedTypes.Select(pt => pt.Type).ToList(),
                Img= data.ApplictionUser.ProfileImgUrl,
                Readings = data.ReadingList.Select(rr => new BusinessLogic.Data.Models.ReadingRecord(data.UserId, rr.IsMyCopy, rr.IsCurrentReading, rr.BookId, rr.StartTime, rr.EndTime)).ToList(),
            };
        }

        public async Task<int> SaveBookToReadingListAsync(BusinessLogic.Data.Models.ReadingRecord readingRecord)
        {
            var user = await _userManager.FindByIdAsync(readingRecord.UserId);
            if (user == null) return -1;

            //Check if UserAppData with userid exists if not create and save
            var userAppData = _context.UserAppData.Where(u => u.UserId == user.Id).FirstOrDefault();
            int userId;
            if(userAppData == null)
            {
                userId = CreateAndSaveDefaultUserData(user);
            }
            else
            {
                userId = userAppData.ID;
            }

            //Save the ReadingRecord to db
            var record = new Data.Models.ReadingRecord()
            {
                BookId = readingRecord.BookId,
                OwnerId = userId,
                IsCurrentReading = readingRecord.IsCurrentReading,
                IsMyCopy = readingRecord.IsMyCopy,
                StartTime = readingRecord.StartTime,
                EndTime = readingRecord.EndTime
            };
            _context.ReadingRecord.Add(record);
            _context.SaveChanges();

            return record.ID;
        }

        private int CreateAndSaveDefaultUserData(Data.Models.ApplicationUser user)
        {
            var userAppData = new Data.Models.UserAppData()
            {
                Description = "",
                UserId = user.Id,
            };
            _context.UserAppData.Add(userAppData);
            _context.SaveChanges();
            return userAppData.ID;
        }
    }
}
