using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class UserPublicData
    {
        public UserResultData Data { get; set; }

        public IEnumerable<BookShelf> BookShelves { get; set; }
    }
}
