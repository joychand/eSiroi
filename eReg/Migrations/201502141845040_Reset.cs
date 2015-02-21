namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Reset : DbMigration
    {
        public override void Up()
        {
            //CreateTable(
            //    "dbo.CensusSubDivision",
            //    c => new
            //        {
            //            DistCode = c.String(nullable: false, maxLength: 2),
            //            SubDivCode = c.String(nullable: false, maxLength: 3),
            //            SubDivName = c.String(nullable: false, maxLength: 40),
            //        })
            //    .PrimaryKey(t => new { t.DistCode, t.SubDivCode, t.SubDivName });
            
            //CreateTable(
            //    "dbo.censusvillage",
            //    c => new
            //        {
            //            DistCode = c.String(nullable: false, maxLength: 2),
            //            SubDivCode = c.String(nullable: false, maxLength: 4),
            //            VillCode = c.String(nullable: false, maxLength: 4),
            //            VillName = c.String(nullable: false, maxLength: 50),
            //            CircleCode = c.String(maxLength: 8),
            //            TRU = c.String(maxLength: 255),
            //        })
            //    .PrimaryKey(t => new { t.DistCode, t.SubDivCode, t.VillCode, t.VillName });
            
            //CreateTable(
            //    "dbo.Circle",
            //    c => new
            //        {
            //            CircleCode = c.String(nullable: false, maxLength: 2),
            //            CircleName = c.String(nullable: false, maxLength: 40),
            //            DistCode = c.String(maxLength: 2),
            //            SubDivCode = c.String(maxLength: 2),
            //        })
            //    .PrimaryKey(t => new { t.CircleCode, t.CircleName });
            
            //CreateTable(
            //    "dbo.District",
            //    c => new
            //        {
            //            DistCode = c.String(nullable: false, maxLength: 2),
            //            DistName = c.String(nullable: false, maxLength: 40),
            //        })
            //    .PrimaryKey(t => t.DistCode);
            
            //CreateTable(
            //    "dbo.MajorTrans_code",
            //    c => new
            //        {
            //            tran_maj_code = c.String(nullable: false, maxLength: 2),
            //            tran_name = c.String(nullable: false, maxLength: 80),
            //            Book = c.String(maxLength: 4),
            //            StampFee = c.Decimal(precision: 18, scale: 2, storeType: "numeric"),
            //        })
            //    .PrimaryKey(t => new { t.tran_maj_code, t.tran_name });
            
            //CreateTable(
            //    "dbo.onlineapplication",
            //    c => new
            //        {
            //            ackno = c.Int(nullable: false),
            //            year = c.String(nullable: false, maxLength: 50),
            //            sro = c.String(nullable: false, maxLength: 50),
            //            name = c.String(maxLength: 50),
            //            adress = c.String(maxLength: 50),
            //            mobile = c.String(maxLength: 50),
            //            aadhar = c.String(maxLength: 50),
            //            trans_maj_code = c.String(maxLength: 2),
            //            password = c.String(maxLength: 50),
            //        })
            //    .PrimaryKey(t => new { t.ackno, t.year, t.sro });
            
            //CreateTable(
            //    "dbo.OnlineExecutant",
            //    c => new
            //        {
            //            Ackno = c.Int(nullable: false),
            //            SlNo = c.Short(nullable: false),
            //            ExecSurName = c.String(maxLength: 50),
            //            ExecMiddleName = c.String(maxLength: 50),
            //            ExecLastName = c.String(maxLength: 50),
            //            Alias = c.String(maxLength: 50),
            //            Sex = c.String(maxLength: 1),
            //            Occupation = c.Short(),
            //            FatherSurName = c.String(maxLength: 50),
            //            FatherMiddleName = c.String(maxLength: 50),
            //            FatherLastName = c.String(maxLength: 50),
            //            State = c.String(maxLength: 50),
            //            District = c.String(maxLength: 50),
            //            SubDivision = c.String(maxLength: 50),
            //            Circle = c.String(maxLength: 50),
            //            Village = c.String(maxLength: 50),
            //            Street = c.String(maxLength: 150),
            //            PostOffice = c.String(maxLength: 150),
            //            PinCode = c.Int(),
            //            PoliceSt = c.String(maxLength: 100),
            //            EnterBy = c.String(maxLength: 15),
            //        })
            //    .PrimaryKey(t => new { t.Ackno, t.SlNo });
            
            //CreateTable(
            //    "dbo.onlinePlot",
            //    c => new
            //        {
            //            ackno = c.Int(nullable: false, identity: true),
            //            DagNo = c.String(maxLength: 25),
            //            PattaNo = c.String(maxLength: 25),
            //            LandType = c.Short(),
            //            Class = c.Short(),
            //            SqFeet = c.String(maxLength: 25),
            //            Unit = c.String(maxLength: 1),
            //            State = c.String(maxLength: 30),
            //            District = c.String(maxLength: 30),
            //            Subdivision = c.String(maxLength: 30),
            //            Circle = c.String(maxLength: 30),
            //            Village = c.String(maxLength: 30),
            //        })
            //    .PrimaryKey(t => t.ackno);
            
            //CreateTable(
            //    "dbo.PoliceStation",
            //    c => new
            //        {
            //            PolStation = c.String(nullable: false, maxLength: 40),
            //            DistCode = c.String(nullable: false, maxLength: 2),
            //            SubDivCode = c.String(maxLength: 2),
            //        })
            //    .PrimaryKey(t => t.PolStation);
            
            //CreateTable(
            //    "dbo.PostOffice",
            //    c => new
            //        {
            //            PostOffice = c.String(nullable: false, maxLength: 40),
            //            DistCode = c.String(nullable: false, maxLength: 2),
            //            PinCode = c.String(nullable: false, maxLength: 6),
            //        })
            //    .PrimaryKey(t => t.PostOffice);
            
            //CreateTable(
            //    "dbo.RevVillage",
            //    c => new
            //        {
            //            VillCode = c.String(nullable: false, maxLength: 3),
            //            VillName = c.String(nullable: false, maxLength: 40),
            //            DistCode = c.String(maxLength: 2),
            //            SubDivCode = c.String(maxLength: 2),
            //            CircleCode = c.String(maxLength: 2),
            //        })
            //    .PrimaryKey(t => new { t.VillCode, t.VillName });
            
            //CreateTable(
            //    "dbo.State",
            //    c => new
            //        {
            //            StateCode = c.Double(nullable: false),
            //            StateName = c.String(maxLength: 40),
            //        })
            //    .PrimaryKey(t => t.StateCode);
            
            //CreateTable(
            //    "dbo.SubDivision",
            //    c => new
            //        {
            //            DistCode = c.String(nullable: false, maxLength: 2),
            //            SubDivCode = c.String(nullable: false, maxLength: 2),
            //            SubDivName = c.String(nullable: false, maxLength: 40),
            //        })
            //    .PrimaryKey(t => new { t.DistCode, t.SubDivCode, t.SubDivName });
            
        }
        
        public override void Down()
        {
            DropTable("dbo.SubDivision");
            DropTable("dbo.State");
            DropTable("dbo.RevVillage");
            DropTable("dbo.PostOffice");
            DropTable("dbo.PoliceStation");
            DropTable("dbo.onlinePlot");
            DropTable("dbo.OnlineExecutant");
            DropTable("dbo.onlineapplication");
            DropTable("dbo.MajorTrans_code");
            DropTable("dbo.District");
            DropTable("dbo.Circle");
            DropTable("dbo.censusvillage");
            DropTable("dbo.CensusSubDivision");
        }
    }
}
