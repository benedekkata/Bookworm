using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Exceptions;
using BookWorm.BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookWorm.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReviewController : ControllerBase
    {
                
        private readonly ReviewService _reviewService;
        public ReviewController(ReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet]
        public IActionResult GetReviewsByBookIsbn([FromQuery] string isbn)
        {
            if (isbn == null) return BadRequest("Please, provide all the required fields!");
            
            var result = _reviewService.GetReviews(isbn);

            if(result.Count() == 0) return NotFound();

            return Ok(result);
        }

        [HttpPost("new")]
        public async Task<IActionResult> AddReview([FromBody] ReviewRequest reviewRequest)
        {
            if (!ModelState.IsValid) return BadRequest("Please, provide all the required fields!");

            try
            {
                await _reviewService.SaveReview(reviewRequest);
                return Ok();
            }
            catch (DbUpdateException)
            {
                return NotFound();
            }
            catch (BookNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("edit")]
        public IActionResult EditReview([FromBody] ReviewRequest reviewRequest)
        {
            if (!ModelState.IsValid) return BadRequest("Please, provide all the required fields!");
            if (reviewRequest.id == 0) return BadRequest("Please, provide review id for the edit functionality!");

            try
            {
                _reviewService.EditReview(reviewRequest);
                return Ok();
            }
            catch (DbUpdateException)
            {
                return NotFound();
            }
        }

        [HttpGet("remove")]
        public IActionResult RemoveReviewById([FromQuery] string id)
        {
            if (id == null) return BadRequest("Please, provide all the required fields!");

            try
            {
                _reviewService.RemoveReview(int.Parse(id));
                return Ok();
            }
            catch (ReviewNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
