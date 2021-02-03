using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace PythonClouds.Models
{
    public class HomeTable
    {
        public int Id { get; set; }
        public string Section { get; set; }
        public string Logo { get; set; }
        public string Url { get; set; }
        public string SubjectText { get; set; }

        private string GetFilePath()
        {
            return HttpContext.Current.Server.MapPath("/XMLDatabase/Home.xml");
        }

        public List<HomeTable> GetContent()
        {
            XDocument xdoc = XDocument.Load(GetFilePath());
            return (from _content in xdoc.Descendants("root").Descendants("HomeTable")
                    select new HomeTable
                    {
                        Id = int.Parse(_content.Element("Id").Value),
                        Logo = _content.Element("Logo").Value,
                        Section = _content.Element("Section").Value,
                        SubjectText = _content.Element("SubjectText").Value,
                        Url = _content.Element("Url").Value
                    }).ToList();
        }
    }
}