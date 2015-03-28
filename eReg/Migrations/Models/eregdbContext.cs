using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace eReg.Models
{
    public class eregdbContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public eregdbContext() : base("name=eregdbContext")
        {
        }

        public System.Data.Entity.DbSet<eReg.Models.District> Districts { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.OnlineExecutant> OnlineExecutant { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.SubDivision> SubDivision { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.censusvillage> CensusVillage { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.PoliceStation> PoliceStation { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.PostOffice> PostOffice { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.State> State { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.CensusSubDivision> CensusSubDivisions { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.MajorTrans_code> MajorTrans_code { get; set; }
        public System.Data.Entity.DbSet<eReg.Migrations.Models.Circle> Circle { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.RevVillage> RevVillage { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.onlineapplication> onlineapplication { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.onlinePlot> onlinePlot { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.OnlineIdentifier> OnlineIdentifier { get; set; }
        public System.Data.Entity.DbSet<eReg.Models.OnlineClaimant> OnlineClaimant { get; set; }
        public System.Data.Entity.DbSet<eReg.Migrations.Models.Executant> Executant { get; set; }
        public System.Data.Entity.DbSet<eReg.Migrations.Models.Claimant> Claimant { get; set; }
        public System.Data.Entity.DbSet<eReg.Migrations.Models.LandType> LandType { get; set; }
        public System.Data.Entity.DbSet<eReg.Migrations.Models.Class> Class { get; set; }
       // public System.Data.Entity.DbSet<eReg.MiModels.Identifier> Identifier { get; set; }
        // public System.Data.Entity.DbSet<eReg.Models.OnlineExecutantList> OnlineExecutantList { get; set; }
    }
}
