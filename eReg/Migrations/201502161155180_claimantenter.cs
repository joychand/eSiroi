namespace eReg.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class claimantenter : DbMigration
    {
        public override void Up()
        {
            //AddColumn("dbo.OnlineClaimant", "EnterBy", c => c.String(maxLength: 15));
        }
        
        public override void Down()
        {
            DropColumn("dbo.OnlineClaimant", "EnterBy");
        }
    }
}
