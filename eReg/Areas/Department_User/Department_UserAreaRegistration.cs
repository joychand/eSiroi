using System.Web.Mvc;

namespace eReg.Areas.Department_User
{
    public class Department_UserAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Department_User";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            //Department module route overrite
            context.MapRoute(
                name: "Department_UserOveride",
                //url:"Department_User/{controller}/{action}/{id}",
                url: "Department_User/{*values}",
                defaults: new { controller = "Department_User", action = "Index" }
            );
            //Department_UserConfig.Register(GlobalConfiguration.Configuration);
            //context.routes.AppendTrailingSlash = true;

        }
    }
}