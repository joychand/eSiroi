namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateaOlappl : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.onlineapplication", "status", c => c.String(maxLength: 50));
           // DropColumn("dbo.onlineapplication", "name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.onlineapplication", "name", c => c.String(maxLength: 50));
            DropColumn("dbo.onlineapplication", "status");
        }
    }
}
