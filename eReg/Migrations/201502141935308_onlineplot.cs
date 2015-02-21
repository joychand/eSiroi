namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class onlineplot : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.onlinePlot", "TransactedArea", c => c.Decimal(precision: 18, scale: 2, storeType: "numeric"));
            AddColumn("dbo.onlinePlot", "address1", c => c.String(maxLength: 30));
            AddColumn("dbo.onlinePlot", "address2", c => c.String(maxLength: 30));
            AddColumn("dbo.onlinePlot", "address3", c => c.String(maxLength: 30));
        }
        
        public override void Down()
        {
            DropColumn("dbo.onlinePlot", "address3");
            DropColumn("dbo.onlinePlot", "address2");
            DropColumn("dbo.onlinePlot", "address1");
            DropColumn("dbo.onlinePlot", "TransactedArea");
        }
    }
}
