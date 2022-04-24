using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class RegisterResult
    {
        public IdentityResult Result { get; set; }
        public string UserId { get; set; }
    }
}
