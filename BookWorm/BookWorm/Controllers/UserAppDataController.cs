using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Exceptions;
using BookWorm.BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;

namespace BookWorm.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserAppDataController : ControllerBase
    {
        private readonly UserAppDataService _userAppDataService;
        public UserAppDataController(UserAppDataService userAppDataService)
        {
            _userAppDataService = userAppDataService;
        }

        [HttpGet("{userid}")]
        public async Task<IActionResult> GetAppDataByUserIdAsync(string userid)
        {
            try
            {
                var result = await _userAppDataService.GetAppDataByUserIdAsync(userid);
                return Ok(result);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("savebook/{isbn}")]
        public async Task<IActionResult> SaveBookToReadingListAsync([FromBody] ReadingRecord readingRecord, string isbn)
        {
            if (!ModelState.IsValid) return BadRequest("Please, provide all the required fields!");

            try
            {
                var res = await _userAppDataService.SaveBookToReadingListAsync(readingRecord, isbn);
                return Ok(res);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (BookNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        //EditDescription

        //EditLikes
    }
}
