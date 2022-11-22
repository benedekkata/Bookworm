using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookWorm.DataAccess.Migrations
{
    public partial class manyshelfs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Book_BookShelf_BookShelfID",
                table: "Book");

            migrationBuilder.DropIndex(
                name: "IX_Book_BookShelfID",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "BookShelfID",
                table: "Book");

            migrationBuilder.CreateTable(
                name: "BookBookShelf",
                columns: table => new
                {
                    BooksId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ShelfsID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookBookShelf", x => new { x.BooksId, x.ShelfsID });
                    table.ForeignKey(
                        name: "FK_BookBookShelf_Book_BooksId",
                        column: x => x.BooksId,
                        principalTable: "Book",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookBookShelf_BookShelf_ShelfsID",
                        column: x => x.ShelfsID,
                        principalTable: "BookShelf",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookBookShelf_ShelfsID",
                table: "BookBookShelf",
                column: "ShelfsID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookBookShelf");

            migrationBuilder.AddColumn<int>(
                name: "BookShelfID",
                table: "Book",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Book_BookShelfID",
                table: "Book",
                column: "BookShelfID");

            migrationBuilder.AddForeignKey(
                name: "FK_Book_BookShelf_BookShelfID",
                table: "Book",
                column: "BookShelfID",
                principalTable: "BookShelf",
                principalColumn: "ID");
        }
    }
}
