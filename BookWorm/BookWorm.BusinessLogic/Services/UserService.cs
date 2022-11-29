using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserAppDataRepository _userAppDataRepository;

        public UserService(IUserRepository userRepository, IUserAppDataRepository userAppDataRepository)
        {
            _userRepository = userRepository;
            _userAppDataRepository = userAppDataRepository;
        }

        public async Task<IEnumerable<UserResultData>> FindUsersAsync(string searchKey)
        {
            return await _userRepository.FindUsersAsync(searchKey);
        }

        public async Task<UserPublicData> GetUserPublicDataAsync(string userId)
        {
            UserResultData userData = await _userRepository.FindUserByIdAsync(userId);
            IEnumerable<BookShelf> shelves = await _userAppDataRepository.GetShelvesAsync(userId);
            
            return new UserPublicData
            {
                Data = userData,
                BookShelves = shelves
            };
        }
    }
}
