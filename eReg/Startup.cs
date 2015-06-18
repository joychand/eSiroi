using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Optimization;
using System.Net.Http.Formatting;
using Newtonsoft.Json.Serialization;
using System.Configuration;
using Microsoft.Owin.Security.DataHandler.Encoder;
[assembly: OwinStartup(typeof(eReg.Startup))]

namespace eReg
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            HttpConfiguration httpConfig = new HttpConfiguration();
            //ConfigureOAuthTokenGeneration(app);
            //ConfigureOAuthTokenConsumption(app);
            ConfigureWebApi(httpConfig);
            app.UseWebApi(httpConfig);
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        private void ConfigureWebApi(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
               name: "DefaultApi",
               routeTemplate: "api/{controller}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );
            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
           //var jsonFormatter = config.Formatters
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
