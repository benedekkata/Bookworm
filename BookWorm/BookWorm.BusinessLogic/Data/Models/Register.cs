using System.ComponentModel.DataAnnotations;

namespace BookWorm.BusinessLogic.Data.Models
{
    public class Register
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
