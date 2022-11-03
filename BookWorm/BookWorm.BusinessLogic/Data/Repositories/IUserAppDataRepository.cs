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
        Task<UserAppData> GetAppDataAsync(string userId);
        Task<int> SaveBookToReadingListAsync(ReadingRecord readingRecord);
    }
}
