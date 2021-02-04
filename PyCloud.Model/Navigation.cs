using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PyCloud.Model
{
    public class Navigation
    {
        public int MenuId { get; set; }
        public string MeneType { get; set; }
        public int ParentMenuId { get; set; }
        public string MenuText { get; set; }
        public string MenuLink { get; set; }
        public string MenuSection { get; set; }


        public List<Navigation> GetSideMenu(string section)
        {
            using (var context = new Entity.pycloudinEntities())
            {
                var result = (from _content in context.AppMenus
                              where _content.MeneType == "Side" && _content.MenuSection == section
                              select new Navigation
                              {
                                  MenuId = _content.MenuId,
                                  MenuLink = string.IsNullOrEmpty(_content.MenuLink) ? "NA" : _content.MenuLink,
                                  MenuText = _content.MenuText,
                                  MenuSection = _content.MenuSection,
                                  MeneType = _content.MeneType,
                                  ParentMenuId = _content.ParentMenuId
                              }).ToList();
                return result;
            }
        }
        public List<Navigation> GetTopMenu()
        {
            using (var context = new Entity.pycloudinEntities())
                return (from _content in context.AppMenus
                        where _content.MeneType == "Top"
                        select new Navigation
                        {
                            MenuId = _content.MenuId,
                            MenuLink = _content.MenuLink,
                            MenuText = _content.MenuText,
                        }).ToList();
        }
    }
}
