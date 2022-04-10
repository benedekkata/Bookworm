using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using Microsoft.AspNetCore.Identity;

namespace BookWorm.BusinessLogic.Services
{
    public class AuthenticationService
    {
        private readonly IAuthenticationRepository _authenticationRepository;

        public AuthenticationService(IAuthenticationRepository authenticationRepository)
        {
            _authenticationRepository = authenticationRepository;
        }

        public async Task<IdentityResult> RegisterUserAsync(Register registerVM)
        {
            return await _authenticationRepository.RegisterUserAsync(registerVM);
        }

        public async Task<ApplicationUser> FindUserByEmailAsync(string email)
        {
            return await _authenticationRepository.FindUserByEmailAsync(email);
        }

        public async Task<bool> ValidatePasswordAsync(ApplicationUser user, string password)
        {
            return await _authenticationRepository.ValidatePasswordAsync(user, password);
        }

        public async Task<AuthResult> VerifyAndGenerateTokenAsync(TokenRequest token)
        {
            return await _authenticationRepository.VerifyAndGenerateTokenAsync(token);
        }

        public async Task<AuthResult> GenerateJWTTokenAsync(ApplicationUser user, string? rToken)
        {
            return await _authenticationRepository.GenerateJWTTokenAsync(user, rToken);
        }
    }
}
