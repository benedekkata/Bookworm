using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Repositories
{
    public interface IReviewRepository
    {
        Task SaveReview(ReviewRequest reviewRequest);
        IEnumerable<Review> GetReview(string isbn);
        void RemoveReview(int id);
        void EditReview(ReviewRequest reviewRequest);
        bool UserHasReviewOnBook(string uid, string isbn);
    }
}
