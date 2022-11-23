using BookWorm.BusinessLogic.Data.Models;
using BookWorm.BusinessLogic.Data.Repositories;
using BookWorm.BusinessLogic.Exceptions;
using Microsoft.AspNetCore.Mvc;
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

        public async Task EditBio(string userId, string biotext)
        {
            var res = await _userAppDataRepository.EditBio(userId, biotext);

            if (!res) throw new UserNotFoundException("There is not any registered user with id: " + userId);
        }

        public async Task EditPreferedTypes(string userId, PreferedType[] preferedTypes)
        {
            var res = await _userAppDataRepository.EditPreferedTypes(userId, preferedTypes);

            if (!res) throw new UserNotFoundException("There is not any registered user with id: " + userId);
        }

        public async Task EditReadingRecordAsync(ReadingRecord readingRecord)
        {
            var res = await _userAppDataRepository.EditReadingRecord(readingRecord);

            if (res == false) throw new UserNotFoundException("There is not any reading record with the given data");
        }

        public async Task FinishReadingAsync(ReadingRecord readingRecord)
        {
            var res = await _userAppDataRepository.FinishReading(readingRecord.BookId, readingRecord.UserId);

            if (res == false) throw new UserNotFoundException("There is not any reading record with the given data");
        }

        public async Task<UserAppData> GetAppDataByUserIdAsync(string userId)
        {
            var res = await _userAppDataRepository.GetAppDataAsync(userId);

            if (res == null) throw new UserNotFoundException("There is not any registered user with id: " + userId);
            return res;
        }

        public async Task<ReadingRecord> GetReadingRecordAsync(string bookId, string userId)
        {
            var res = await _userAppDataRepository.GetReadingRecord(bookId, userId);

            if (res == null) throw new UserNotFoundException("There is not any reading record with the given data");

            return res;
        }

        public async Task RemoveReadingRecordAsync(ReadingRecord readingRecord)
        {
            var res = await _userAppDataRepository.RemoveReadingRecord(readingRecord.BookId, readingRecord.UserId);

            if (res == false) throw new UserNotFoundException("There is not any reading record with the given data");
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

        public async Task<int> SaveBookToWishListAsync(string isbn, string uid)
        {
            //Save book to db first
            try
            {
                var book = await _bookRepository.GetBookByIsbn(isbn);
                var bookId = await _bookRepository.SaveBook(book);

                if (bookId != null)
                {
                    var res = await _userAppDataRepository.SaveBookToWishListAsync(uid, bookId);

                    if (res == -1) throw new UserNotFoundException("There is not any registered user with id: " + uid);
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
