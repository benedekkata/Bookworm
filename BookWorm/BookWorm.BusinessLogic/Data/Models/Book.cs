using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class Book
    {
        public string? Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string DatePublished { get; set; }
        public string Publisher { get; set; }
        public string Synopsis { get; set; }
        public string Overview { get; set; }
        public string[] Subjects { get; set; }
        public string[] Authors { get; set; }
        public string Isbn13 { get; set; }
        public string Isbn { get; set; }
        public string Language { get; set; }
        public int? Pages { get; set; }

    }
}
