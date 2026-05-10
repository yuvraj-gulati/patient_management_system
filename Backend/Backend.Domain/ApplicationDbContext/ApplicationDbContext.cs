using Group8Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Group8Backend.Domain.ApplicationDbContextt
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<UserModel> Yuvi_User { get; set; }
        //public DbSet<OrganizationModel> Yuvi_Organizations { get; set; }
        //public DbSet<OrganizationAddressModel> Yuvi_OrganizationAddresses { get; set; }

        public DbSet<PatientModel> Yuvi_PatientsDb { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //modelBuilder.Entity<OrganizationAddressModel>()
            //    .HasOne(a => a.Organization)
            //    .WithMany(o => o.OrganizationAddressList)
            //   .HasForeignKey(a => a.OrganizationId);
        }
        public class BaseEntityConfiguration : IEntityTypeConfiguration<BaseEntity>
        {
            public void Configure(EntityTypeBuilder<BaseEntity> builder)
            {
                builder.Property(e => e.CreatedDate).HasDefaultValueSql("GETDATE()");
                builder.Property(e => e.ModifiedDate).HasDefaultValueSql("GETDATE()");
                builder.Property(e => e.IsDeleted).HasDefaultValue(false);
                builder.Property(e => e.IsActive).HasDefaultValue(true);
            }
        }
    }
}
