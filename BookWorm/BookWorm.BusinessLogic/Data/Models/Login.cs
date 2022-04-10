using System.ComponentModel.DataAnnotations;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class Login
    {
        [Required]
        public string EmailAddress { get; set; }
       
        [Required]
        public string Password { get; set; }
    }
}
