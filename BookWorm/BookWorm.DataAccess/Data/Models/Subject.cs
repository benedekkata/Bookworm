using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.DataAccess.Data.Models
{
    [Owned]
    public class Subject
    {
        public string? Name { get; set; }
    }
}
