using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Exceptions;
using BookWorm.BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
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


        [HttpPost("wishlist/{isbn}")]
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

        [HttpDelete("wishlist/{isbn}")]
        public async Task<IActionResult> RemoveBookFromWishListAsync(string isbn, [FromQuery] string uid)
        {
            if (isbn == null || uid == null) return BadRequest("Please, provide all the required fields!");

            try
            {
                await _userAppDataService.RemoveBookFromWishListAsync(isbn, uid);
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

        [HttpGet("readingrecord")]
        public async Task<IActionResult> GetReadingRecordAsync([FromQuery] string bookId, [FromQuery] string userId)
        {
            if (bookId == null || userId == null) return BadRequest("You need to specify at least the bookId and the userId for this!");

            try
            {
                var res = await _userAppDataService.GetReadingRecordAsync(bookId, userId);
                return Ok(res);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("shelves")]
        public async Task<IActionResult> GetShelvesAsync([FromQuery] string userId)
        {
            if (userId == null) return BadRequest("You need to provide a userId for this!");

            try
            {
                var res = await _userAppDataService.GetShelvesAsync(userId);
                return Ok(res);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
        [HttpGet("shelves/{shelfId}")]
        public async Task<IActionResult> GetShelfByIdAsync([FromRoute] int shelfId)
        {
            if (shelfId == null) return BadRequest("You need to provide a shelfId  and userId for this!");

            var res = await _userAppDataService.GetShelfByIdAsync(shelfId);
            return Ok(res);
        }

        [HttpGet("shelves/{shelfId}/isowned")]
        public async Task<IActionResult> CheckIfOwnShelfAsync([FromRoute] int shelfId)
        {
            if (shelfId == null) return BadRequest("You need to provide a shelfId  and userId for this!");
                        
            var res = await _userAppDataService.CheckIfOwnShelfAsync(shelfId);
            return Ok(res);
        }

        [HttpDelete("shelves/{shelfId}")]
        public async Task<IActionResult> DeleteShelfByIdAsync([FromRoute] int shelfId, [FromQuery] string userId)
        {
            if (shelfId == null || userId == null) return BadRequest("You need to provide a shelfId and userId for this!");

            try
            {
                await _userAppDataService.DeleteShelfByIdAsync(shelfId, userId);
                return NoContent();
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("shelves")]
        public async Task<IActionResult> EditShelfByIdAsync([FromBody] BookShelf shelf)
        {
            if (!ModelState.IsValid) return BadRequest("You need to provide the right fileds for this!");

            try
            {
                await _userAppDataService.EditShelfByIdAsync(shelf);
                return Ok();
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("shelves")]
        public async Task<IActionResult> CreateShelfAsync([FromBody] BookShelf shelf)
        {
            if (!ModelState.IsValid) return BadRequest("You need to provide the right fileds for this!");

            try
            {
                var res = await _userAppDataService.CreateShelfAsync(shelf);
                return Ok(res);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("shelves/save")]
        public async Task<IActionResult> SaveBookToShelf([FromBody] SaveToShelfRequest request)
        {
            if (!ModelState.IsValid) return BadRequest("You need to provide a userId for this!");

            try
            {
                await _userAppDataService.SaveBookToShelf(request);
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
    }
}
