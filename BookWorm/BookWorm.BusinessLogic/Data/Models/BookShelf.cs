using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class BookShelf
    {
        public int? ID
        {
            get; set;
        }

        public int OwnerId { get; set; }

        public string Name
        {
            get; set;
        }

        public List<string> BookIds
        {
            get; set;
        }

        public bool IsPrivate
        {
            get; set;
        }

        public bool IsWishlist
        {
            get; set;
        }

        public string IconURL
        {
            get; set;
        }
    }
}
