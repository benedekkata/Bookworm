using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.DataAccess.Data.Models
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string? Title { get; set; }
        public string? ISBN { get; set; }
        public string? ISBN13 { get; set; }
        public string? Publisher { get; set; }
        public string? Language { get; set; }
        public string? DatePublished { get; set; }
        public int? Pages { get; set; }
        public string? ImageURL { get; set; }
        public string? Synopsis { get; set; }
        public string? Overview { get; set; }

        public List<Author> Authors { get; set; }
        public List<Subject> Subjects { get; set; }

        public List<Review> Reviews { get; set; }

        public List<BookShelf> Shelfs { get; set; }
    }
}
