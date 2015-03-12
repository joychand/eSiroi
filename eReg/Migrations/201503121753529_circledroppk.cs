namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class circledroppk : DbMigration
    {
        public override void Up()
        {
           // DropPrimaryKey("dbo.Circle");
            AlterColumn("dbo.Circle", "CircleCode", c => c.String(nullable: false, maxLength: 3));
            AlterColumn("dbo.Circle", "DistCode", c => c.String(maxLength: 3));
            AlterColumn("dbo.Circle", "SubDivCode", c => c.String(maxLength: 3));
            AddPrimaryKey("dbo.Circle", new[] { "CircleCode", "CircleName" });
        }
        
        public override void Down()
        {
            //DropPrimaryKey("dbo.Circle");
            AlterColumn("dbo.Circle", "SubDivCode", c => c.String(maxLength: 2));
            AlterColumn("dbo.Circle", "DistCode", c => c.String(maxLength: 2));
            AlterColumn("dbo.Circle", "CircleCode", c => c.String(nullable: false, maxLength: 2));
            AddPrimaryKey("dbo.Circle", new[] { "CircleCode", "CircleName" });
        }
    }
}
