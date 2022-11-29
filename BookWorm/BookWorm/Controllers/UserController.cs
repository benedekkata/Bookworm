using BookWorm.BusinessLogic.Exceptions;
using BookWorm.BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookWorm.WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> FindUsersAsync([FromQuery] string searchKey)
        {
            if (searchKey == null) return BadRequest("You need to provide a searchKey for this!");

            var res = await _userService.FindUsersAsync(searchKey);
            return Ok(res);
        }

        [HttpGet("public/{userId}")]
        public async Task<IActionResult> GetUserPublicDataAsync(string userId)
        {
            if (userId == null) return BadRequest("You need to provide a userId for this!");

            var res = await _userService.GetUserPublicDataAsync(userId);
            return Ok(res);
        }

    }
}
