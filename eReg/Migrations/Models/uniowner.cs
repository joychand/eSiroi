namespace eReg.Migrations.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("uniowner")]
    public partial class uniowner
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(10)]
        public string LocCd { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(30)]
        public string NewDagNo { get; set; }

        [StringLength(30)]
        public string NewPattaNo { get; set; }

        [StringLength(10)]
        public string ownno { get; set; }

        [StringLength(150)]
        public string Name { get; set; }

        [StringLength(150)]
        public string Father { get; set; }

        [StringLength(150)]
        public string Address { get; set; }

        public double? PArea { get; set; }

        [StringLength(1)]
        public string OFlag { get; set; }

        public decimal? MutNo { get; set; }

        [StringLength(7)]
        public string SocialClass { get; set; }
    }
}
