using PyCloud.AzureClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PyCloud.Model
{
    public class GetTutorialContent
    {

        public string ShareName { get; set; }

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
                this.ShareName = "appcontaint";
                FileStorage fileStorage = new FileStorage(AppSetting.StorageConnectionString, this.ShareName.ToLower());
                var folderpath = result._content.MenuSection.ToLower();
                var filename = $"{result._content.MenuLink.Replace("-", "").ToLower()}.html";
                var content = fileStorage.ReadFile(folderpath, filename);
                topicContent.ContentText = content;
                topicContent.HeaderText = result._blog.BlogTitle;
                return topicContent;
            }
        }
    }
    public class TopicContent
    {
        public string HeaderText { get; set; }

        public string ContentText { get; set; }
    }
}
