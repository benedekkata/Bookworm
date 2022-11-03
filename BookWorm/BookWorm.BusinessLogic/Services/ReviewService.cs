using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.BusinessLogic.Exceptions;
using BookWorm.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Services
{
    public class ReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IBookRepository _bookRepository;

        public ReviewService(IReviewRepository reviewRepository, IBookRepository bookRepository)
        {
            _reviewRepository = reviewRepository;
            _bookRepository = bookRepository;
        }

        public async Task SaveReview(ReviewRequest reviewRequest)
        {
            try
            {
                var book = await _bookRepository.GetBookByIsbn(reviewRequest.bookIsbn);
                await _bookRepository.SaveBook(book);
                await _reviewRepository.SaveReview(reviewRequest);
            }
            catch (HttpRequestException e)
            {
                throw new BookNotFoundException($"{e.Message}");
            }
        }

        public IEnumerable<Review> GetReviews(string isbn)
        {
            return _reviewRepository.GetReview(isbn);
        }
        public void RemoveReview(int id)
        {
            _reviewRepository.RemoveReview(id);
        }

        public void EditReview(ReviewRequest reviewRequest)
        {
            _reviewRepository.EditReview(reviewRequest);
        }
    }
}
