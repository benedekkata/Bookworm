using BookWorm.BusinessLogic.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace BookWorm.BusinessLogic.Data.Repositories
{
    public interface IAuthenticationRepository
    {
        public Task<IdentityResult> RegisterUserAsync(Register registerVM);

        public Task<ApplicationUser> FindUserByEmailAsync(string email);

        public Task<bool> ValidatePasswordAsync(ApplicationUser user, string password);

        public  Task<AuthResult> VerifyAndGenerateTokenAsync(TokenRequest token);

        public  Task<AuthResult> GenerateJWTTokenAsync(ApplicationUser user, string? rToken);

        public bool VerifyToken(string token);
    }
}
