namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class onlineIdentifier : DbMigration
    {
        public override void Up()
        {
            ////DropPrimaryKey("dbo.onlinePlot");
            //AlterColumn("dbo.onlinePlot", "ackno", c => c.Int(nullable: false));
            //AddPrimaryKey("dbo.onlinePlot", "ackno");
            //DropColumn("dbo.OnlineExecutant", "EnterBy");
        }
        
        public override void Down()
        {
            AddColumn("dbo.OnlineExecutant", "EnterBy", c => c.String(maxLength: 15));
            DropPrimaryKey("dbo.onlinePlot");
            AlterColumn("dbo.onlinePlot", "ackno", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.onlinePlot", "ackno");
        }
    }
}
