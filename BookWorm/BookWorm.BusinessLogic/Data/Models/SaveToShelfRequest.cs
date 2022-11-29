using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class SaveToShelfRequest
    {
        public int ShelfId { get; set; }
        public string Isbn { get; set; }
        public string UserId { get; set; }
    }
}
