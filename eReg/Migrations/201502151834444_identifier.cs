namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class identifier : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.OnlineIdentifier",
                c => new
                    {
                        Ackno = c.Int(nullable: false),
                        SlNo = c.Short(nullable: false),
                        IdentSurName = c.String(maxLength: 50),
                        IdentMiddleName = c.String(maxLength: 50),
                        IdentLastName = c.String(maxLength: 50),
                        Alias = c.String(maxLength: 50),
                        Identify = c.String(maxLength: 10),
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
                .PrimaryKey(t => new { t.Ackno, t.SlNo });
            
        }
        
        public override void Down()
        {
            DropTable("dbo.OnlineIdentifier");
        }
    }
}
