namespace eReg.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RevVillage")]
    public partial class RevVillage
    {
        [StringLength(2)]
        public string DistCode { get; set; }

        [StringLength(2)]
        public string SubDivCode { get; set; }

        [StringLength(2)]
        public string CircleCode { get; set; }

        [Key]
        [Column(Order = 0)]
        [StringLength(3)]
        public string VillCode { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(40)]
        public string VillName { get; set; }
    }
}
