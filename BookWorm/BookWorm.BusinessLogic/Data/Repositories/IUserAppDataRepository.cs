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
        Task<bool> EditBio(string userId, string biotext);
        Task<bool> EditPreferedTypes(string userId, PreferedType[] preferedTypes);
        Task<bool> EditReadingRecord(ReadingRecord readingRecord);
        Task<bool> FinishReading(string? bookId, string userId);
        Task<UserAppData> GetAppDataAsync(string userId);
        Task<bool> RemoveReadingRecord(string? bookId, string userId);
        Task<int> SaveBookToReadingListAsync(ReadingRecord readingRecord);
        Task<int> SaveBookToWishListAsync(string uid, string bookId);
    }
}
