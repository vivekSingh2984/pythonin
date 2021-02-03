using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using PythonClouds.ApplicationEntity;
using PythonClouds.ApplicationModel;

namespace PythonClouds.Controllers
{
    //[RoutePrefix("api/[Controller]")]
    public class CommonController : ApiController
    {
        [Route("api/Common/GetSideMenu/{section}")]
        [HttpGet]
        public IEnumerable<Models.SideNavBar> GetSideMenu(string section)
        {
            try
            {
                return new Models.SideNavBar().GetMenuContent(section);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/Common/GetHomeContent")]
        [HttpGet]
        public IEnumerable<Models.HomeTable> GetHomeContent()
        {
            try
            {
                return new Models.HomeTable().GetContent();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
