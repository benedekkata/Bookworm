using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.BusinessLogic.Exceptions;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Services
{
    public class UserAppDataService
    {
        private readonly IUserAppDataRepository  _userAppDataRepository;
        private readonly IBookRepository _bookRepository;

        public UserAppDataService(IUserAppDataRepository userAppDataRepository, IBookRepository bookRepository)
        {
            _userAppDataRepository = userAppDataRepository;
            _bookRepository = bookRepository;
        }

        public async Task<UserAppData> GetAppDataByUserIdAsync(string userId)
        {
            var res = await _userAppDataRepository.GetAppDataAsync(userId);

            if (res == null) throw new UserNotFoundException("There is not any registered user with id: " + userId);
            return res;
        }

        public async Task<int> SaveBookToReadingListAsync(ReadingRecord readingRecord, string isbn)
        {
            //Save book to db first
            try
            {
                var book = await _bookRepository.GetBookByIsbn(isbn);
                var bookId = await _bookRepository.SaveBook(book);

                if(bookId != null)
                {
                    readingRecord.BookId = bookId;

                    var res = await _userAppDataRepository.SaveBookToReadingListAsync(readingRecord);

                    if (res == -1) throw new UserNotFoundException("There is not any registered user with id: " + readingRecord.UserId);
                    return res;
                }
                else
                {
                    throw new BookNotFoundException("Some error occured during the saving!");
                }
            }
            catch (HttpRequestException e)
            {
                throw new BookNotFoundException($"{e.Message}");
            }
        }
    }
}
