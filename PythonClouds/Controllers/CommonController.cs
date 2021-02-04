using PyCloud.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace PythonClouds.Controllers
{
    //[RoutePrefix("api/[Controller]")]
    public class CommonController : ApiController
    {
        [Route("api/Common/GetSideMenu/{section}")]
        [HttpGet]
        public IEnumerable<Navigation> GetSideMenu(string section)
        {
            try
            {
                return new Navigation().GetSideMenu(section);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [Route("api/Common/GetTopMenu")]
        [HttpGet]
        public IEnumerable<Navigation> GetTopMenu()
        {
            try
            {
                return new Navigation().GetTopMenu();
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
