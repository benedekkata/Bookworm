﻿using Microsoft.AspNetCore.Authorization;
using BookWorm.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using BookWorm.BusinessLogic.Exceptions;

namespace BookWorm.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;
        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookByTitleOrAuthorName([FromQuery] string searchQuery, [FromQuery] int? page = 0, [FromQuery] int? minYear = null, [FromQuery] int? maxYear=null, [FromQuery] bool? onlyReview=null, [FromQuery] string? uid = null, [FromQuery] string? order = null)
        {
            if(searchQuery == null) return BadRequest("Please, provide all the required fields!");

            try
            {
                var result = await _bookService.GetBookByTitleOrAuthorName(searchQuery, page, minYear, maxYear, onlyReview, uid, order);
                return Ok(result);
            }
            catch (BookNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetBookByIsbn([FromQuery] string isbn)
        {
            if (isbn == null) return BadRequest("Please, provide all the required fields!");

            try
            {
                var result = await _bookService.GetBookByIsbn(isbn);
                return Ok(result);
            }
            catch (BookNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveBook([FromQuery] string isbn)
        {
            if (isbn == null) return BadRequest("Please, provide all the required fields!");

            try
            {
                await _bookService.SaveBookByIsbn(isbn);
                return Ok();
            }
            catch (BookNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
