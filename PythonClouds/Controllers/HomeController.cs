using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PythonClouds.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var host = Request.IsLocal;
            if (!host)
            {
                ViewData["WebPortalServer"] = ConfigurationManager.AppSettings["WebPortalServer"].ToString();
            }
            else
            {
                ViewData["WebPortalServer"] = ConfigurationManager.AppSettings["WebPortalServerLocal"].ToString();
            }
            return View();
        }
    }
}