namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addOnlineClaimant : DbMigration
    {
        public override void Up()
        {
            //DropTable("dbo.OnlineClaimant");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.OnlineClaimant",
                c => new
                    {
                        TSNo = c.Int(nullable: false),
                        TSYear = c.Short(nullable: false),
                        SlNo = c.Short(nullable: false),
                        ClaimSurName = c.String(maxLength: 50),
                        ClaimMiddleName = c.String(maxLength: 50),
                        ClaimLastName = c.String(maxLength: 50),
                        Alias = c.String(maxLength: 50),
                        Sex = c.String(maxLength: 1),
                        Occupation = c.Short(),
                        FatherSurName = c.String(maxLength: 50),
                        FatherMiddleName = c.String(maxLength: 50),
                        FatherLastName = c.String(maxLength: 50),
                        State = c.String(maxLength: 50),
                        District = c.String(maxLength: 50),
                        SubDivision = c.String(maxLength: 50),
                        Circle = c.String(maxLength: 50),
                        Village = c.String(maxLength: 50),
                        Street = c.String(maxLength: 150),
                        PostOffice = c.String(maxLength: 150),
                        PinCode = c.Int(),
                        PoliceSt = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => new { t.TSNo, t.TSYear, t.SlNo });
            
        }
    }
}
