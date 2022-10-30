using BookWorm.BusinessLogic.Data.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Repositories
{
    public interface ISettingRepository
    {
        Task<IdentityResult> ChangePasswordAsync(string userId, string oldPassword, string newPassword);
        Task<UserSetting> GetSettingsAsync(string userId);
        Task UpdateSettingsAsync(string userId, UserSetting setting);
    }
}
