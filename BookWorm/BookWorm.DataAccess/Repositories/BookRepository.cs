using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.DataAccess.Data;
using BookWorm.DataAccess.Data.JSONConverters;
using BookWorm.DataAccess.Data.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace BookWorm.DataAccess.Repositories
{
    public class BookRepository: IBookRepository
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

        public async Task<IEnumerable<BusinessLogic.Data.Models.Book>> GetBookByTitleOrAuthorName(string searchQuery)
        {
            HttpResponseMessage response = await _client.GetAsync(@$"https://api2.isbndb.com/books/{searchQuery}");
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();

            var resObj = JsonConvert.DeserializeObject<ISBNBookWrapper>(responseBody);
            
            var result = new List<BusinessLogic.Data.Models.Book>();

            foreach (var item in resObj.books)
            {
                result.Add(new BusinessLogic.Data.Models.Book()
                {
                    Title = item.title,
                    Authors = item.authors,
                    Image = item.image,
                    Isbn = item.isbn,
                    Isbn13 = item.isbn13,
                    Pages = item.pages,
                    DatePublished = item.date_published,
                    Publisher = item.publisher,
                    Synopsis = item.synopsis != null ? item.synopsis : item.synopsys,
                    Overview = item.overview,
                    Subjects = item.subjects,
                    Language = item.language,
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

        public async Task SaveBook(BusinessLogic.Data.Models.Book book)
        {
            var booksInDb = _context.Book.Where(b => (b.ISBN == book.Isbn || b.ISBN13 == book.Isbn13)).ToList();
            if (booksInDb.Count() == 0)
            {
                _context.Book.Add(new Data.Models.Book
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
                });

                await _context.SaveChangesAsync();
            }
        }
    }
}
