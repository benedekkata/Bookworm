using BookWorm.BusinessLogic.Data.Models;

namespace BookWorm.BusinessLogic.Data.Repositories
{
    public interface IBookRepository
    {
        Task<IEnumerable<ReducedBook>> GetBookByTitleOrAuthorName(string searchQuery);
        Task<Book> GetBookByIsbn(string isbn);
        Task<Book> GetBookFormDbByIsbn(string isbn);
        Task<string> SaveBook(Book book);
        Task<Book> GetBookById(string bookId);
        Task<IEnumerable<Book>> GetBooksByShelfId(int shelfId);
        Task<Book> DeleteBookByIsbnFromShelf(int shelfId, string isbn);
    Task<double> GetBookRatingByIdAsync(string bookId);
  }
}
