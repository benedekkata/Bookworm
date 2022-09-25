using BookWorm.BusinessLogic.Data.Models;

namespace BookWorm.BusinessLogic.Data.Repositories
{
    public interface IBookRepository
    {
        Task<IEnumerable<ReducedBook>> GetBookByTitleOrAuthorName(string searchQuery);
        Task<Book> GetBookByIsbn(string isbn);
        Task SaveBook(Book book);
    }
}
