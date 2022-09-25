using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.BusinessLogic.Exceptions;

namespace BookWorm.BusinessLogic.Services
{
    public class BookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<IEnumerable<ReducedBook>> GetBookByTitleOrAuthorName(string searchQuery)
        {
            try
            {
                var bookList = await _bookRepository.GetBookByTitleOrAuthorName(searchQuery);
                return bookList;
            }
            catch (HttpRequestException e)
            {
                throw new BookNotFoundException($"{e.Message}");
            }
        }

        public async Task<Book> GetBookByIsbn(string isbn)
        {
            try
            {
                var book = await _bookRepository.GetBookByIsbn(isbn);
                return book;
            }
            catch (HttpRequestException e)
            {
                throw new BookNotFoundException($"{e.Message}");
            }
        }

        public async Task SaveBookByIsbn(string isbn)
        {
            var book = await GetBookByIsbn(isbn);
            await _bookRepository.SaveBook(book);
        }
    }
}
