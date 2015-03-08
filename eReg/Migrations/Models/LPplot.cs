namespace eReg.Migrations.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class LPplot : DbContext
    {
        public LPplot()
            : base("name=LPContext")
        {
        }

        public virtual DbSet<uniowner> uniowners { get; set; }
        public virtual DbSet<uniplot> uniplots { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<uniowner>()
                .Property(e => e.ownno)
                .IsFixedLength();

            modelBuilder.Entity<uniowner>()
                .Property(e => e.MutNo)
                .HasPrecision(18, 0);

            modelBuilder.Entity<uniowner>()
                .Property(e => e.SocialClass)
                .IsUnicode(false);

            modelBuilder.Entity<uniplot>()
                .Property(e => e.EntryDate)
                .IsFixedLength();

            modelBuilder.Entity<uniplot>()
                .Property(e => e.RemarkType)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<uniplot>()
                .Property(e => e.usr)
                .IsUnicode(false);

            modelBuilder.Entity<uniplot>()
                .Property(e => e.MutNo)
                .HasPrecision(18, 0);

            modelBuilder.Entity<uniplot>()
                .Property(e => e.MutOld)
                .HasPrecision(18, 0);
        }
    }
}
