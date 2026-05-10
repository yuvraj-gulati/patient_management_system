using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Group8Backend.Domain.Migrations
{
    /// <inheritdoc />
    public partial class first : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Yuvi_Organizations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessKey = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationMobileNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationFaxNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Yuvi_Organizations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Yuvi_PatientsDb",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientFirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientMobileNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientCountry = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientState = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientStreetAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientGender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Yuvi_PatientsDb", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Yuvi_User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserDob = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserPhone = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    UserGender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Yuvi_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Yuvi_OrganizationAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Organization_Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Organization_State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Organization_City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Organization_Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Yuvi_OrganizationAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Yuvi_OrganizationAddresses_Yuvi_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Yuvi_Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Yuvi_OrganizationAddresses_OrganizationId",
                table: "Yuvi_OrganizationAddresses",
                column: "OrganizationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Yuvi_OrganizationAddresses");

            migrationBuilder.DropTable(
                name: "Yuvi_PatientsDb");

            migrationBuilder.DropTable(
                name: "Yuvi_User");

            migrationBuilder.DropTable(
                name: "Yuvi_Organizations");
        }
    }
}
