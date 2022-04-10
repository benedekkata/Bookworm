using Microsoft.AspNetCore.Identity;

namespace BookWorm.DataAccess.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string DisplayedName
        {
            get; set;
        }

        public ApplicationUser() :base()
        {

        }

        public ApplicationUser(BusinessLogic.Data.Models.ApplicationUser user) : base()
        {
            DisplayedName = user.DisplayedName;
            Email = user.Email;
            UserName = user.UserName;
            SecurityStamp = user.SecurityStamp;
            Id = user.Id;
            PasswordHash = user.PasswordHash;
        }
    }
}
