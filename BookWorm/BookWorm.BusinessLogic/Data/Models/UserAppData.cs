using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class UserAppData
    {
        public string UserId { get; set; }

        public string DisplayName { get; set; }
        
        public string? Description { get; set; }
        
        public string Img { get; set; }

        public List<string> Likes { get; set; }
        
        public List<ReadingRecord> Readings { get; set; }
        public List<BookShelf> BookShelves { get; set; }
    }
}
