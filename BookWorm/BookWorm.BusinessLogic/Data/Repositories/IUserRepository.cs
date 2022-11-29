using BookWorm.BusinessLogic.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Repositories
{
    public interface IUserRepository
    {
        Task<UserResultData> FindUserByIdAsync(string userId);
        Task<IEnumerable<UserResultData>> FindUsersAsync(string searchKey);
    }
}
