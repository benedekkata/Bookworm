using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.BusinessLogic.Exceptions;
using BookWorm.DataAccess.Data;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.DataAccess.Repositories
{
    public class SettingRepository : ISettingRepository
    {
        private readonly UserManager<Data.Models.ApplicationUser> _userManager;
        public SettingRepository(UserManager<Data.Models.ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> ChangePasswordAsync(string userId, string oldPassword, string newPassword)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new UserNotFoundException("Settings for user with id: " + userId + " does not exist");

            return await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
        }

        public async Task<UserSetting> GetSettingsAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null) return null;

            return new UserSetting() { UserName= user.UserName, Age=user.Age, DisplayedName=user.DisplayedName, Email= user.Email, ProfileImgUrl=user.ProfileImgUrl, Sex=user.Sex};
        }

        public async Task UpdateSettingsAsync(string userId, UserSetting setting)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new UserNotFoundException("Settings for user with id: " + userId + " does not exist");

            user.Age = setting.Age;
            user.DisplayedName = String.IsNullOrEmpty(setting.DisplayedName) ? user.DisplayedName : setting.DisplayedName;
            user.Email = String.IsNullOrEmpty(setting.Email) ? user.Email : setting.Email;
            user.ProfileImgUrl = setting.ProfileImgUrl;
            user.Sex =setting.Sex;
            user.UserName = String.IsNullOrEmpty(setting.UserName) ? user.UserName : setting.UserName;

            await _userManager.UpdateAsync(user);
        }
    }
}
