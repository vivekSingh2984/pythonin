using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace PythonClouds.Models
{
    public class SideNavBar
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ParentId { get; set; }
        public string Section { get; set; }
        public string Url { get; set; }

        private string GetFilePath(string Section)
        {
            return HttpContext.Current.Server.MapPath($"/XMLDatabase/{Section}Menu.xml");
        }

        public List<SideNavBar> GetMenuContent(string Section)
        {
            XDocument xdoc = XDocument.Load(GetFilePath(Section));
            return (from _content in xdoc.Descendants("root").Descendants("SideMenuTable")
                    select new SideNavBar
                    {
                        Id = int.Parse(_content.Element("Id").Value),
                        Section = _content.Element("Section").Value,
                        Url = _content.Element("Url").Value,
                        Name = _content.Element("Name").Value,
                        ParentId= int.Parse(_content.Element("ParentId").Value)
                    }).ToList();
        }
    }
}