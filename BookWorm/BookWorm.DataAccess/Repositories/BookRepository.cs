using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.DataAccess.Data.JSONConverters;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace BookWorm.DataAccess.Repositories
{
    public class BookRepository: IBookRepository
    {
        private readonly IConfiguration _configuration;
        public readonly HttpClient _client;

        public BookRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _client = new HttpClient();
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

        public async Task<Book> GetBookByIsbn(string isbn)
        {
            HttpResponseMessage response = await _client.GetAsync(@$"https://api2.isbndb.com/book/{isbn}");
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            var resObj = JsonConvert.DeserializeObject<ISBNSimpleBookWrapper>(responseBody);

            var result = new Book()
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
    }
}
