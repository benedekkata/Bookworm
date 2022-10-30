using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.BusinessLogic.Exceptions;
using BookWorm.BusinessLogic.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Services
{
    public class SettingService
    {
        
        private readonly ISettingRepository _settingRepository;

        public SettingService(ISettingRepository settingRepository)
        {
            _settingRepository = settingRepository;
        }

        public async Task<IdentityResult> ChangePasswordByUserIdAsync(string userId, PasswordChange passwords)
        {
            if (passwords.NewPassword != passwords.ConfirmPassword) throw new ArgumentException("Password validation should match the new password");
            return await _settingRepository.ChangePasswordAsync(userId, passwords.OldPassword, passwords.NewPassword);
        }

        public async Task<UserSetting> GetSettingsByUserIdAsync(string userId)
        {
            var res = await _settingRepository.GetSettingsAsync(userId);

            if (res == null) throw new UserNotFoundException("Settings for user with id: " + userId + " does not exist");
            return res;
        }

        public async Task UpdateSettingsByUserIdAsync(string userId, UserSetting setting)
        {
            await _settingRepository.UpdateSettingsAsync(userId, setting);
        }
    }
}
