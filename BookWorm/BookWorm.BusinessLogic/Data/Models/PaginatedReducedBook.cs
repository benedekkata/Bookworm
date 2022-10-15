using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class PaginatedReducedBook
    {
        public IEnumerable<ReducedBook> Books { get; set; }

        public int CurrentPage { get; set; }

        public int ItemPerPage { get; set; }

        public int Total { get; set; }
    }
}
