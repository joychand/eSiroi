namespace eReg.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class CensusSubDiv : DbContext
    {
        public CensusSubDiv()
            : base("name=CensusSubDiv")
        {
        }

        public virtual DbSet<CensusSubDivision> CensusSubDivisions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CensusSubDivision>()
                .Property(e => e.DistCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<CensusSubDivision>()
                .Property(e => e.SubDivCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<CensusSubDivision>()
                .Property(e => e.SubDivName)
                .IsUnicode(false);
        }
    }
}
