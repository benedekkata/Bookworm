using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.DataAccess.Data.Models
{
    public class BookShelf
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID
        {
            get; set;
        }

        public int OwnerId { get; set; }

        [ForeignKey(nameof(OwnerId))]
        public UserAppData Owner { get; set; }

        public string Name
        {
            get; set;
        }

        public List<Book> Books
        {
            get; set;
        }

        public bool IsPrivate
        {
            get; set;
        }

        public bool IsWhislist
        {
            get; set;
        }

        public string IconURL
        {
            get; set;
        }
    }
}
