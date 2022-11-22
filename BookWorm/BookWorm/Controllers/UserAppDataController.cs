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


        [HttpPost("savewishlist/{isbn}")]
        public async Task<IActionResult> SaveBookToWishListAsync(string isbn, [FromQuery] string uid )
        {
            if (isbn==null || uid==null) return BadRequest("Please, provide all the required fields!");

            try
            {
                await _userAppDataService.SaveBookToWishListAsync(isbn, uid);
                return Ok();
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

        [HttpPost("editbio/{userId}")]
        public async Task<IActionResult> EditBioAsync([FromRoute] string userId, [FromBody] BioText bioText)
        {
            if (userId == null || bioText == null) return BadRequest("Please, provide all the required fields!");

            try
            {
                await _userAppDataService.EditBio(userId, bioText.Text);
                return Ok();
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("editpreferedtypes/{userId}")]
        public async Task<IActionResult> EditPreferedTypesAsync([FromRoute] string userId, [FromBody] PreferedType[] preferedTypes)
        {
            if (userId == null || preferedTypes == null) return BadRequest("Please, provide all the required fields!");

            try
            {
                await _userAppDataService.EditPreferedTypes(userId, preferedTypes);
                return Ok();
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("readingrecord")]
        public async Task<IActionResult> RemoveReadingRecordAsync([FromBody] ReadingRecord readingRecord)
        {
            if (readingRecord.BookId == null || readingRecord.UserId == null) return BadRequest("You need to specify at least the bookId and the userId for this!");

            try
            {
                await _userAppDataService.RemoveReadingRecordAsync(readingRecord);
                return NoContent();
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("readingrecord/finishbook")]
        public async Task<IActionResult> FinishReadingAsync([FromBody] ReadingRecord readingRecord)
        {
            if (readingRecord.BookId == null || readingRecord.UserId == null) return BadRequest("You need to specify at least the bookId and the userId for this!");

            try
            {
                await _userAppDataService.FinishReadingAsync(readingRecord);
                return Ok();
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("readingrecord")]
        public async Task<IActionResult> EditReadingRecordAsync([FromBody] ReadingRecord readingRecord)
        {
            if (!ModelState.IsValid) return BadRequest("Please, provide all the required fields!");

            try
            {
                await _userAppDataService.EditReadingRecordAsync(readingRecord);
                return Ok();
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
