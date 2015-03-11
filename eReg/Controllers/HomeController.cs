using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eReg.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "eRegistrar";

            return View();
        }
        public ActionResult home()
        {
            

            return View();
        }
        public ActionResult login()
        {
            //ViewBag.Title = "Login";

            return View();
        }
        public ActionResult registration()
        {
            //ViewBag.Title = "Registration";

            return View();
        }
        public ActionResult applyregistration()
        {
            //ViewBag.Title = "Registration";

            return View();
        }
        public ActionResult success()
        {
            //ViewBag.Title = "Registration";

            //return View();
            return File("/Views/Home/success.html", "text/html");
        }
        public ActionResult executant()
        {
            return File("/Views/Home/executant.html", "text/html");
        }
        public ActionResult regsidemenu()
        {
            return File("/Views/Home/regsidemenu.html", "text/html");
        }
        public ActionResult registrationcontent()
        {
            return File("/Views/Home/registrationcontent.html", "text/html");
        }
        public ActionResult registrationforms()
        {
            return File("/Views/Home/registrationforms.html", "text/html");
        }
        public ActionResult applyRegLogin()
        {
            return File("/Views/Home/applyRegLogin.html", "text/html");
        }
        public ActionResult claimant()
        {
            return File("/Views/Home/claimant.html", "text/html");
        }
        public ActionResult identifier()
        {
            return File("/Views/Home/identifier.html", "text/html");
        }
        public ActionResult applyPropertyDetails()
        {
            return File("/Views/Home/applyPropertyDetails.html", "text/html");
        }
        public ActionResult department()
        {
            return File("/Views/Home/department.html", "text/html");
        }
        public ActionResult departmentcontent()
        {
            return File("/Views/Home/departmentcontent.html", "text/html");
        }
        public ActionResult deptsidemenu()
        {
            return File("/Views/Home/deptsidemenu.html", "text/html");
        }
        public ActionResult dept_home()
        {
            return File("/Views/Home/dept_home.html", "text/html");
        }
        public ActionResult dept_dataEntry()
        {
            return File("/Views/Home/dept_DataEntry.html", "text/html");
        }
        public ActionResult dept_dataEntry_form()
        {
            return File("/Views/Home/dept_dataEntry_form.html", "text/html");
        }
        public ActionResult dept_dataEntry_form_property()
        {
            return File("/Views/Home/dept_dataEntry_form_property.html", "text/html");
        }
        public ActionResult dept_dataEntry_form_claimant()
        {
            return File("/Views/Home/dept_dataEntry_form_claimant.html", "text/html");
        }
         public ActionResult dept_dataEntry_form_executant()
        {
            return File("/Views/Home/dept_dataEntry_form_executant.html", "text/html");
        }
         public ActionResult dept_dataEntry_form_identifier()
         {
             return File("/Views/Home/dept_dataEntry_form_identifier.html", "text/html");
         }
         public ActionResult deptOnlineData()
         {
             return File("/Views/Home/deptOnlineData.html", "text/html");
         }
         public ActionResult searchReg()
         {
             return File("/Views/Home/searchReg.html", "text/html");
         }
         public ActionResult modal()
         {
             return File("/Views/Home/modal.html", "text/html");
         }

        public ActionResult plotVerifyModal()
         {
             return File("/Views/Home/plotVerifyModal.html", "text/html");
         }
       
         //public ActionResult modal()
         //{
         //    return File("/Views/Home/modal.html", "text/html");
         //}
    }
}
