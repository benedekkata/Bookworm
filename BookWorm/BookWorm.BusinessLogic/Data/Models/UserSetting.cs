using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class UserSetting
    {
        public string DisplayedName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string? ProfileImgUrl{ get; set; }

        public string? Sex { get; set; }

        public int? Age { get; set; }
    }
}
