using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Models
{
    public class Review
    {
        public int Id { get; set; }

        public string Comment { get; set; }

        public int Stars { get; set; }

        public string UserId { get; set; }

        public string BookId { get; set; }

        public string BookIsbn { get; set; }
    }
}
