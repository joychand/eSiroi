namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class remove : DbMigration
    {
        public override void Up()
        {
            //AddColumn("dbo.onlinePlot", "TransactedArea", c => c.Decimal(precision: 18, scale: 2, storeType: "numeric"));
            //AddColumn("dbo.onlinePlot", "EnterBy", c => c.String(maxLength: 15));
        }
        
        public override void Down()
        {
            DropColumn("dbo.onlinePlot", "EnterBy");
            DropColumn("dbo.onlinePlot", "TransactedArea");
        }
    }
}
