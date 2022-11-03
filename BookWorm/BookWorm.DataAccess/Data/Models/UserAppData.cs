using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.DataAccess.Data.Models
{
    public class UserAppData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public List<ReadingDate> ReadingDates { get; set; }

        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public ApplicationUser ApplictionUser { get; set; }


        public string Description { get; set; }

        public List<PreferedType> PreferedTypes { get; set; }

        public List<BookShelf> BookShelfs { get; set; }

        public List<ReadingRecord> ReadingList { get; set; }
    }
}
