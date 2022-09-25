using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class ReviewRequest
    {
        [Required]
        public int stars { get; set; }

        [Required]
        public string userId { get; set; }

        [Required]
        public string comment { get; set; }

        [Required]
        public string bookIsbn { get; set; }

        public int id { get; set; }

        public string bookId { get; set; }
    }
}
