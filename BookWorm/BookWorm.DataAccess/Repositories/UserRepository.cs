using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.DataAccess.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<Data.Models.ApplicationUser> _userManager;
        private IHttpContextAccessor _httpContextAccessor;

        public UserRepository(
            ApplicationDbContext context,
            UserManager<Data.Models.ApplicationUser> userManager,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<UserResultData> FindUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var profile = _context.UserAppData.FirstOrDefault(uad => uad.UserId == userId);
            var results = new UserResultData
            {
                UserId = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayedName,
                ProfileImgUrl = user.ProfileImgUrl,
                Description = profile?.Description ?? null,
                Likes = profile?.PreferedTypes?.Select(pt => pt.Type) ?? new List<string>()
            };

            return results;
        }

        public async Task<IEnumerable<UserResultData>> FindUsersAsync(string searchKey)
        {
            var currentUserName = _httpContextAccessor.HttpContext?.User.Identities.First().Name;
            var users = await _userManager.Users.Where(u => u.UserName != currentUserName && (u.DisplayedName.Contains(searchKey) || u.Email.Contains(searchKey))).ToListAsync();

            var results = users.Select(u =>
            {
                var profile = _context.UserAppData.FirstOrDefault(uad => uad.UserId == u.Id);
                return new UserResultData
                {
                    UserId = u.Id,
                    Email = u.Email,
                    DisplayName = u.DisplayedName,
                    ProfileImgUrl = u.ProfileImgUrl,
                    Description = profile?.Description ?? null,
                    Likes = profile?.PreferedTypes?.Select(pt => pt.Type) ?? new List<string>()
                };
            }).ToList();

            return results;
        }
    }
}
