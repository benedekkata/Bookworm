using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class ReadingRecord
    {
        public ReadingRecord(string userId, bool isMyCopy, bool isCurrentReading, string? bookId, DateTime? startTime, DateTime? endTime)
        {
            BookId = bookId;
            UserId = userId;
            StartTime = startTime;
            EndTime = endTime;
            IsMyCopy = isMyCopy;
            IsCurrentReading = isCurrentReading;
        }

        public string? BookId { get; set; }

        public string UserId { get; set; }

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
