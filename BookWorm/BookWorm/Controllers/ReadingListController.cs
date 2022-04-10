using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookWorm.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReadingListController : ControllerBase
    {

        //ReadingListController
        //1 AddToReadingListByISBN13/ISBN(10) - POST --> this should search for the book insbn and save the book if it is not yet saved
        //2 RemoveFromReadingListByISBN13/ISBN(10) - chached book can stay DELETE
    }
}
