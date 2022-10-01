using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.BusinessLogic.Exceptions;
using BookWorm.DataAccess.Data;
using BookWorm.DataAccess.Data.JSONConverters;
using BookWorm.DataAccess.Data.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace BookWorm.DataAccess.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext _context;
        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void EditReview(ReviewRequest reviewRequest)
        {
            var reviewInDb = _context.Review.Where(r => r.Id == reviewRequest.id).FirstOrDefault();
            if (reviewInDb == null)
            {
                throw new ReviewNotFoundException("There is no review in the database with id " + reviewRequest.id);
            }
            reviewInDb.Stars = reviewRequest.stars;
            reviewInDb.Comment = reviewRequest.comment;
            _context.SaveChanges();
        }

        public IEnumerable<BusinessLogic.Models.Review> GetReview(string isbn)
        {
            var booksInDb = _context.Book.Where(b => (b.ISBN == isbn || b.ISBN13 == isbn)).FirstOrDefault();
            if (booksInDb != null)
            {
               return _context.Review.Where(r => r.BookId == booksInDb.Id).ToList().Select(ri => new BusinessLogic.Models.Review
               {
                   BookId = booksInDb.Id,
                   BookIsbn = isbn,
                   Comment = ri.Comment,
                   Stars = ri.Stars,
                   Id = ri.Id,
                   UserId = ri.UserId
               }).ToList();
            }

            return new List<BusinessLogic.Models.Review>();
        }

        public void RemoveReview(int id)
        {
            var reviewInDb = _context.Review.Where(r => r.Id == id).FirstOrDefault();
            if(reviewInDb == null)
            {
                throw new ReviewNotFoundException("There is no review in the database with id " + id);
            }
            else
            {
                _context.Remove(reviewInDb);
                _context.SaveChanges();
            }
        }

        public async Task SaveReview(ReviewRequest reviewRequest)
        {
            var booksInDb = _context.Book.Where(b => (b.ISBN == reviewRequest.bookIsbn || b.ISBN13 == reviewRequest.bookIsbn)).FirstOrDefault();
            if (booksInDb != null)
            {
                _context.Review.Add(new Review
                {
                    BookId = booksInDb.Id,
                    Comment = reviewRequest.comment,
                    Stars = reviewRequest.stars,
                    UserId = reviewRequest.userId,
                });
                await _context.SaveChangesAsync();
            }
        }
    }
}
