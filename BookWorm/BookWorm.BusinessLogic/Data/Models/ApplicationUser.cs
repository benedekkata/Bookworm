namespace BookWorm.BusinessLogic.Data.Models
{
    public class ApplicationUser
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string SecurityStamp { get; set; }
        public string DisplayedName{ get; set; }
        public string PasswordHash{ get; set; }
    }
}
