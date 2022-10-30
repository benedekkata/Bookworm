using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Exceptions;
using BookWorm.BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BookWorm.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SettingController : ControllerBase
    {
        private readonly SettingService _settingService;
        public SettingController(SettingService settingService)
        {
            _settingService = settingService;
        }

        [HttpGet("{userid}")]
        public async Task<IActionResult> GetSettingsByUserIdAsync(string userid)
        {
            try
            {
                var result = await _settingService.GetSettingsByUserIdAsync(userid);
                return Ok(result);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("{userid}")]
        public async Task<IActionResult> UpdateSettingsByUserIdAsync(string userid, [FromBody] UserSetting setting)
        {
            if (!ModelState.IsValid) return BadRequest("Please, provide all the required fields!");

            try
            {
                await _settingService.UpdateSettingsByUserIdAsync(userid, setting);
                return Ok();
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("changepassword/{userid}")]
        public async Task<IActionResult> ChangePasswordByUserIdAsync(string userid, [FromBody] PasswordChange passwords)
        {
            if (!ModelState.IsValid) return BadRequest("Please, provide all the required fields!");

            try
            {
                var res = await _settingService.ChangePasswordByUserIdAsync(userid, passwords);
                if (res.Succeeded) return Ok();
                else return BadRequest(String.Join('\n', res.Errors.Select(e => e.Description).ToList()));
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
