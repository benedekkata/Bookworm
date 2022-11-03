using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.DataAccess.Data.Models
{
    public class ReadingRecord
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

        public string BookId { get; set; }

        [ForeignKey(nameof(BookId))]

        public Book Book
        {
            get; set;
        }

        public DateTime? StartTime
        {
            get; set;
        }

        public DateTime? EndTime
        {
            get; set;
        }

        public bool IsMyCopy
        {
            get; set;
        }

        public bool IsCurrentReading
        {
            get; set;
        }
    }
}
