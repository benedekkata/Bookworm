using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.DataAccess.Data;
using BookWorm.DataAccess.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookWorm.DataAccess.Repositories
{
    public class AuthenticationRepository: IAuthenticationRepository
    {
        private readonly UserManager<Data.Models.ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly TokenValidationParameters _tokenValidationParameters;

        public AuthenticationRepository(UserManager<Data.Models.ApplicationUser> userManager, ApplicationDbContext context, IConfiguration configuration, TokenValidationParameters tokenValidationParameters)
        {
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
            _tokenValidationParameters = tokenValidationParameters;
        }

        public async Task<IdentityResult> RegisterUserAsync(Register registerVM)
        {
            Data.Models.ApplicationUser newUser = new Data.Models.ApplicationUser()
            {
                DisplayedName = registerVM.DisplayName,
                Email = registerVM.EmailAddress,
                UserName = registerVM.UserName,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            return await _userManager.CreateAsync(newUser, registerVM.Password);
        }

        public async Task<BusinessLogic.Data.Models.ApplicationUser> FindUserByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return null;
            }

            return new BusinessLogic.Data.Models.ApplicationUser()
            {
                DisplayedName = user.DisplayedName,
                Email = user.Email,
                UserName = user.UserName,
                SecurityStamp = user.SecurityStamp,
                Id = user.Id,
                PasswordHash = user.PasswordHash,
            };
        }

        public async Task<bool> ValidatePasswordAsync(BusinessLogic.Data.Models.ApplicationUser user, string password)
        {
            var newUser = new Data.Models.ApplicationUser(user);
            
            return await _userManager.CheckPasswordAsync(newUser, password);
        }

        public async Task<AuthResult> VerifyAndGenerateTokenAsync(TokenRequest token)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var storedToken = await _context.RefreshToken.FirstOrDefaultAsync(x => x.Token == token.RefreshToken);
            var dbUser = await _userManager.FindByIdAsync(storedToken.UserId);
            try
            {
                var tokenCheckResult = jwtTokenHandler.ValidateToken(token.Token, _tokenValidationParameters, out var validatedToken);
                return await GenerateJWTTokenAsync(dbUser, storedToken.Token);
            }
            catch (SecurityTokenExpiredException)
            {
                if (storedToken.DateExpire >= DateTime.UtcNow)
                {
                    return await GenerateJWTTokenAsync(dbUser, storedToken.Token);
                }
                else
                {
                    return await GenerateJWTTokenAsync(dbUser, null);
                }
            }
        }

        public async Task<AuthResult> GenerateJWTTokenAsync(BusinessLogic.Data.Models.ApplicationUser user, string? rToken)
        {
            var appUser = new Data.Models.ApplicationUser(user);

            return await GenerateJWTTokenAsync(appUser, rToken);
        }

        private async Task<AuthResult> GenerateJWTTokenAsync(Data.Models.ApplicationUser user, string? rToken)
        {
            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var authSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]));
            var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:Issuer"],
                    audience: _configuration["JWT:Audience"],
                    expires: DateTime.UtcNow.AddMinutes(10),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            if (rToken != null)
            {
                var rTokenResponse = new AuthResult()
                {
                    Token = jwtToken,
                    RefreshToken = rToken,
                    ExpiresAt = token.ValidTo
                };
                return rTokenResponse;
            }

            var refreshToken = new RefreshToken()
            {
                JwtId = token.Id,
                IsRevoked = false,
                UserId = user.Id,
                DateAdded = DateTime.UtcNow,
                DateExpire = DateTime.UtcNow.AddMonths(6),
                Token = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString(),
            };

            await _context.RefreshToken.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            var response = new AuthResult()
            {
                Token = jwtToken,
                RefreshToken = refreshToken.Token,
                ExpiresAt = token.ValidTo
            };

            return response;
        }
    }
}
