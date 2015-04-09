namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Onappl_Add_date_field : DbMigration
    {
        public override void Up()
        {
            //AddColumn("dbo.onlineapplication", "date", c => c.String(maxLength: 20));
        }
        
        public override void Down()
        {
            //DropColumn("dbo.onlineapplication", "date");
        }
    }
}
