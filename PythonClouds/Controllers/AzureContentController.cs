using PyCloud.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PythonClouds.Controllers
{
    public class AzureContentController : ApiController
    {
        [Route("api/AzureContent/GetAzureContent/{topic}")]
        [HttpGet]
        public TopicContent GetAzureContent(string topic)
        {
            try
            {
               return new GetTutorialContent().GetContent(topic);
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    
}
