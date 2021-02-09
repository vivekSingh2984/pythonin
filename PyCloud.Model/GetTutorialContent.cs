using PyCloud.AzureClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;

namespace PyCloud.Model
{
    public class GetTutorialContent
    {

        public string ShareName { get; set; }

        public GetTutorialContent()
        {
            this.ShareName = "appcontaint";
        }
        public string DocPath { get; set; }

        public TopicContent GetContent(string url)
        {

            using (var context = new Entity.pycloudinEntities())
            {
                var result = (from _content in context.AppMenus
                              join _blog in context.AppBlogs on _content.MenuId equals _blog.MenuId
                              where _content.MenuLink == url
                              select new { _content, _blog }).FirstOrDefault();
                TopicContent topicContent = new TopicContent();               
                FileStorage fileStorage = new FileStorage(AppSetting.StorageConnectionString, this.ShareName.ToLower());
                var folderpath = result._content.MenuSection.ToLower();
                var filename = $"{result._content.MenuLink.Replace("-", "").ToLower()}.html";
                var content = fileStorage.ReadFile(folderpath, filename);
                topicContent.ContentText = content;
                topicContent.HeaderText = result._blog.BlogTitle;
                return topicContent;
            }
        }

        public List<ListItem> GetArea()
        {
            List<ListItem> returnResult = new List<ListItem>();
            returnResult.Add(new ListItem { Text = "Select", Value = "" });
            using (var context = new Entity.pycloudinEntities())
            {
                var result = (from _content in context.AppMenus
                              select new { _content.MenuSection }).ToList().Distinct();
                foreach (var item in result)
                {
                    returnResult.Add(new ListItem { Text = item.MenuSection, Value = item.MenuSection });
                }
                
            }
            return returnResult;
        }
        public List<ListItem> GetBlog(string section)
        {
            List<ListItem> returnResult = new List<ListItem>();
            returnResult.Add(new ListItem { Text = "Select", Value = "" });
            using (var context = new Entity.pycloudinEntities())
            {
                var result = (from _content in context.AppMenus
                              where _content.MenuLink != null && _content.MenuSection == section
                              select new { _content.MenuText, _content.MenuLink }).ToList().Distinct();
                foreach (var item in result)
                {
                    returnResult.Add(new ListItem { Text = item.MenuText, Value = item.MenuLink });
                }

            }
            return returnResult;
        }
    }
    public class TopicContent
    {
        public string HeaderText { get; set; }

        public string ContentText { get; set; }
    }

    public class DropDownData
    {
        public string Text { get; set; }

        public string Value { get; set; }
    }
}
