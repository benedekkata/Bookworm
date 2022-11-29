using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class UserResultData
    {
        public string UserId { get; set; }

        public string DisplayName { get; set; }

        public string Email { get; set; }

        public string ProfileImgUrl { get; set; }

        public string Description { get; set; }

        public IEnumerable<string> Likes { get; set; }
    }
}
