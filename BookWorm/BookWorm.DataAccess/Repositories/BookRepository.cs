using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.BusinessLogic.Exceptions;
using BookWorm.DataAccess.Data;
using BookWorm.DataAccess.Data.JSONConverters;
using BookWorm.DataAccess.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace BookWorm.DataAccess.Repositories
{
  public class BookRepository : IBookRepository
  {
    private readonly IConfiguration _configuration;
    public readonly HttpClient _client;
    private readonly ApplicationDbContext _context;

    public BookRepository(IConfiguration configuration, ApplicationDbContext context)
    {
      _configuration = configuration;
      _client = new HttpClient();
      _context = context;
      _client.DefaultRequestHeaders.Add("Authorization", _configuration["ApiKeys:IsbnDbKey"]);
    }

    public async Task<IEnumerable<ReducedBook>> GetBookByTitleOrAuthorName(string searchQuery)
    {
      HttpResponseMessage response = await _client.GetAsync(@$"https://api2.isbndb.com/books/{searchQuery}");
      response.EnsureSuccessStatusCode();

      string responseBody = await response.Content.ReadAsStringAsync();

      var resObj = JsonConvert.DeserializeObject<ISBNBookWrapper>(responseBody);

      var result = new List<ReducedBook>();

      foreach (var item in resObj.books)
      {
        result.Add(new ReducedBook()
        {
          Title = item.title,
          Authors = item.authors,
          Image = item.image,
          Isbn = item.isbn,
          Isbn13 = item.isbn13,
          DatePublished = item.date_published
        });
      }

      return result;
    }

    public async Task<BusinessLogic.Data.Models.Book> GetBookByIsbn(string isbn)
    {
      HttpResponseMessage response = await _client.GetAsync(@$"https://api2.isbndb.com/book/{isbn}");
      response.EnsureSuccessStatusCode();

      string responseBody = await response.Content.ReadAsStringAsync();
      var resObj = JsonConvert.DeserializeObject<ISBNSimpleBookWrapper>(responseBody);

      var result = new BusinessLogic.Data.Models.Book()
      {
        Title = resObj.book.title,
        Authors = resObj.book.authors,
        Image = resObj.book.image,
        Isbn = resObj.book.isbn,
        Isbn13 = resObj.book.isbn13,
        Pages = resObj.book.pages,
        DatePublished = resObj.book.date_published,
        Publisher = resObj.book.publisher,
        Synopsis = resObj.book.synopsis != null ? resObj.book.synopsis : resObj.book.synopsys,
        Overview = resObj.book.overview,
        Subjects = resObj.book.subjects,
        Language = resObj.book.language,
      };

      return result;
    }

    public async Task<string> SaveBook(BusinessLogic.Data.Models.Book book)
    {
      var booksInDb = _context.Book.Where(b => (b.ISBN == book.Isbn || b.ISBN13 == book.Isbn13)).ToList();
      if (booksInDb.Count() == 0)
      {
        var newBook = new Data.Models.Book
        {
          DatePublished = book.DatePublished,
          ImageURL = book.Image,
          Title = book.Title,
          ISBN = book.Isbn,
          ISBN13 = book.Isbn13,
          Pages = book.Pages,
          Language = book.Language,
          Publisher = book.Publisher,
          Synopsis = book.Synopsis,
          Overview = book.Overview,
          Subjects = book.Subjects?.Select(s => new Subject { Name = s }).ToList() ?? new List<Subject>(),
          Authors = book.Authors?.Select(a => new Author { Name = a }).ToList() ?? new List<Author>(),
        };
        _context.Book.Add(newBook);

        await _context.SaveChangesAsync();

        return newBook.Id;
      }

      return booksInDb[0].Id;
    }

    public async Task<BusinessLogic.Data.Models.Book> GetBookById(string bookId)
    {
      var book = _context.Book.Where(b => b.Id == bookId).FirstOrDefault();

      if (book == null) return null;

      var result = new BusinessLogic.Data.Models.Book()
      {
        Title = book.Title,
        Authors = book.Authors.Select(a => a.Name).ToArray(),
        Image = book.ImageURL,
        Isbn = book.ISBN,
        Isbn13 = book.ISBN13,
        Pages = book.Pages,
        DatePublished = book.DatePublished,
        Publisher = book.Publisher,
        Synopsis = book.Synopsis,
        Overview = book.Overview,
        Subjects = book.Subjects.Select(s => s.Name).ToArray(),
        Language = book.Language,
        Id = book.Id,
      };

      return result;
    }

    public async Task<BusinessLogic.Data.Models.Book> GetBookFormDbByIsbn(string isbn)
    {
      var book = _context.Book.Where(b => b.ISBN13 == isbn || b.ISBN == isbn).FirstOrDefault();

      if (book == null) return null;

      var result = new BusinessLogic.Data.Models.Book()
      {
        Title = book.Title,
        Authors = book.Authors.Select(a => a.Name).ToArray(),
        Image = book.ImageURL,
        Isbn = book.ISBN,
        Isbn13 = book.ISBN13,
        Pages = book.Pages,
        DatePublished = book.DatePublished,
        Publisher = book.Publisher,
        Synopsis = book.Synopsis,
        Overview = book.Overview,
        Subjects = book.Subjects.Select(s => s.Name).ToArray(),
        Language = book.Language,
        Id = book.Id,
      };

      return result;
    }

    public async Task<IEnumerable<BusinessLogic.Data.Models.Book>> GetBooksByShelfId(int shelfId)
    {

      var shelf = _context.BookShelf.Include(bs => bs.Books).Where(bs => bs.ID == shelfId).FirstOrDefault();

      if (shelf == null) return null;

      var books = ConvertBooks(shelf.Books);

      return books;
    }

    private IEnumerable<BusinessLogic.Data.Models.Book> ConvertBooks(List<Data.Models.Book> books)
    {

      return books.Select(book => new BusinessLogic.Data.Models.Book()
      {
        Title = book.Title,
        Authors = book.Authors.Select(a => a.Name).ToArray(),
        Image = book.ImageURL,
        Isbn = book.ISBN,
        Isbn13 = book.ISBN13,
        Pages = book.Pages,
        DatePublished = book.DatePublished,
        Publisher = book.Publisher,
        Synopsis = book.Synopsis,
        Overview = book.Overview,
        Subjects = book.Subjects.Select(s => s.Name).ToArray(),
        Language = book.Language,
        Id = book.Id,
      });

    }

    public async Task<BusinessLogic.Data.Models.Book> DeleteBookByIsbnFromShelf(int shelfId, string isbn)
    {
      var shelf = _context.BookShelf.Include(bs => bs.Books).Where(bs => bs.ID == shelfId).FirstOrDefault();

      if (shelf == null) return null;

      var bookToDelete = shelf.Books.Where(b => b.ISBN13 == isbn || b.ISBN == isbn).FirstOrDefault();

      if (bookToDelete == null) return null;

      shelf.Books.Remove(bookToDelete);
      _context.SaveChanges();

      return new BusinessLogic.Data.Models.Book()
      {
        Title = bookToDelete.Title,
        Authors = bookToDelete.Authors.Select(a => a.Name).ToArray(),
        Image = bookToDelete.ImageURL,
        Isbn = bookToDelete.ISBN,
        Isbn13 = bookToDelete.ISBN13,
        Pages = bookToDelete.Pages,
        DatePublished = bookToDelete.DatePublished,
        Publisher = bookToDelete.Publisher,
        Synopsis = bookToDelete.Synopsis,
        Overview = bookToDelete.Overview,
        Subjects = bookToDelete.Subjects.Select(s => s.Name).ToArray(),
        Language = bookToDelete.Language,
        Id = bookToDelete.Id,
      };
    }

    public async Task<double> GetBookRatingByIdAsync(string bookId)
    {
      var reviews = await _context.Review.Where(r => r.BookId == bookId).ToListAsync();
      if (reviews == null || !reviews.Any()) throw new BookNotFoundException($"Reviews for book with bookId: {bookId} is not found");

      return reviews.Average((r) => r.Stars);
    }
  }
}
