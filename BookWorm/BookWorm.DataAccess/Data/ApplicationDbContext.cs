
using BookWorm.DataAccess.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookWorm.DataAccess.Data
{
    public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<RefreshToken> RefreshToken { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<UserAppData> UserAppData { get; set; }
        public DbSet<BookShelf> BookShelf { get; set; }
        public DbSet<ReadingRecord> ReadingRecord { get; set; }
    }
}
