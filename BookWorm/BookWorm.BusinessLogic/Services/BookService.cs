using BookWorm.BusinessLogic.Data;
using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.BusinessLogic.Exceptions;
using System.Net;

namespace BookWorm.BusinessLogic.Services
{
    public class BookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IReviewRepository _reviewRepository;

        public BookService(IBookRepository bookRepository, IReviewRepository reviewRepository)
        {
            _bookRepository = bookRepository;
            _reviewRepository = reviewRepository;
        }

        public async Task<PaginatedReducedBook> GetBookByTitleOrAuthorName(string searchQuery, int? page = 0, int? minYear = null, int? maxYear = null, bool? onlyReview = null, string? uid = null, string? order = null)
        {
            try
            {
                var bookList = await _bookRepository.GetBookByTitleOrAuthorName(searchQuery);
                if (minYear != null) bookList = bookList.Where(b => int.Parse(b.DatePublished) >= minYear);
                if (maxYear != null) bookList = bookList.Where(b => int.Parse(b.DatePublished) <= maxYear);
                if (onlyReview != null && uid != null) bookList = bookList.Where(b => _reviewRepository.UserHasReviewOnBook(uid, b.Isbn13 != null ? b.Isbn13 : b.Isbn));
                if (order != null) bookList = SetListOrder(bookList, order);
                int totalPage = (int) Math.Ceiling(bookList.Count() / 10.0);
                bookList = bookList.Skip(page.Value * 10).Take(10);

                return new PaginatedReducedBook() { Books = bookList, CurrentPage = page.Value, ItemPerPage= 10, Total = totalPage};
            }
            catch (HttpRequestException e)
            {
                throw new BookNotFoundException($"{e.Message}");
            }
        }

        private IEnumerable<ReducedBook> SetListOrder(IEnumerable<ReducedBook> bookList, string order)
        {
            switch (order)
            {
                case "abc_asc": return bookList.OrderBy(b => b.Title);
                case "abc_desc": return bookList.OrderByDescending(b => b.Title);
                case "pd_asc": return bookList.OrderBy(b => b.DatePublished);
                case "pd_desc": return bookList.OrderByDescending(b => b.DatePublished);
                case "isbn_asc": return bookList.OrderBy(b => b.Isbn13 == null ? b.Isbn13 : b.Isbn);
                case "isbn_desc": return bookList.OrderByDescending(b => b.Isbn13 == null ? b.Isbn13 : b.Isbn);
                default: return bookList;
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

        public async Task<Book> GetBookById(string bookId)
        {
            var book =  await _bookRepository.GetBookById(bookId);
            if (book == null) throw new BookNotFoundException($"Book with id: {bookId} is not found");
            else return book;
        }

        public async Task<IEnumerable<Book>> GetBooksByShelfId(int shelfId)
        {
            var books = await _bookRepository.GetBooksByShelfId(shelfId);
            if (books == null) throw new BookNotFoundException($"Book with shelfId: {shelfId} is not found");
            else return books;
        }

        public async Task DeleteBookByIsbnFromShelf(int shelfId, string isbn)
        {
            var books = await _bookRepository.DeleteBookByIsbnFromShelf(shelfId, isbn);
            if (books == null) throw new BookNotFoundException($"Book with shelfId: {shelfId} is not found");
        }
    }
}
