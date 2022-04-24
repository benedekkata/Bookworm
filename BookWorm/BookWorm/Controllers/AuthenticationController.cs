
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using BookWorm.BusinessLogic.Services;
using BookWorm.BusinessLogic.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace BookWorm.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthenticationService _authenticationService;

        public AuthenticationController(AuthenticationService authenticationService)
        {
           _authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]Register registerVM)
        {
            if(!ModelState.IsValid) return BadRequest("Please, provide all the required fields!");

            var userExists = await _authenticationService.FindUserByEmailAsync(registerVM.EmailAddress);
            if (userExists != null) return BadRequest($"User with email: {registerVM.EmailAddress} already exists");

            var result = await _authenticationService.RegisterUserAsync(registerVM);

            if (result.Succeeded) return Ok("UserCreated");

            return BadRequest($"The user could not be created!\n{ String.Join('\n', result.Errors.Select(x => x.Description)) }");
        } 

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login loginVM)
        {
            if (!ModelState.IsValid) return BadRequest("Please, provide all the required fields!");
            
            var userExists = await _authenticationService.FindUserByEmailAsync(loginVM.EmailAddress);
            if (userExists != null && await _authenticationService.ValidatePasswordAsync(userExists, loginVM.Password)) 
            {
                var tokenValue = await _authenticationService.GenerateJWTTokenAsync(userExists, null);
                return Ok(tokenValue);
            }
            
            return Unauthorized();
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequest tokenRequestVM)
        {
            if (!ModelState.IsValid) return BadRequest("Please, provide all the required fields!");

            var result = await _authenticationService.VerifyAndGenerateTokenAsync(tokenRequestVM);

            return Ok(result);
        }

        [HttpPost("validate-token")]
        public IActionResult ValidateToken([FromBody] string token)
        {
            if (token == String.Empty) return BadRequest("Please, provide all the required fields!");

            var result = _authenticationService.VerifyToken(token);

            return result? Ok() : Unauthorized("The provided token is not valid!");
        }
    }
}
