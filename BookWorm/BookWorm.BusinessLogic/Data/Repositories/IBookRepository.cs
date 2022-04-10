using BookWorm.BusinessLogic.Data.Models;

namespace BookWorm.BusinessLogic.Data.Repositories
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetBookByTitleOrAuthorName(string searchQuery);
        Task<IEnumerable<Book>> GetBookByIsbn(string isbn);
    }
}
