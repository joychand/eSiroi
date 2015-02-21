namespace eReg.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("District")]
    public partial class District
    {
        [Key]
        [StringLength(2)]
        public string DistCode { get; set; }

        [Required]
        [StringLength(40)]
        public string DistName { get; set; }
    }
}
