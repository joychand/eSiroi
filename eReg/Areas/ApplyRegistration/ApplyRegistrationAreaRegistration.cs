using System.Web.Mvc;

namespace eReg.Areas.ApplyRegistration
{
    public class ApplyRegistrationAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "ApplyRegistration";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "ApplyRegistration_default",
                "ApplyRegistration/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}