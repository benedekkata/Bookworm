using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class ReducedBook
    {
        public string Title { get; set; }
        public string Image { get; set; }
        public string DatePublished { get; set; }
        public string[] Authors { get; set; }
        public string Isbn13 { get; set; }
        public string Isbn { get; set; }
    }
}
