
using PyCloud.AzureClass;
using PythonClouds.ApplicationEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PythonClouds.ApplicationModel
{
    public class GetTutorialContent
    {

        public string ShareName { get; set; }

        public string DocPath { get; set; }

        public TopicContent GetContent(string url)
        {
            TopicContent topicContent = new TopicContent();
            this.ShareName = "Azure";
            FileStorage fileStorage = new FileStorage(AppSetting.StorageConnectionString, this.ShareName.ToLower());
            var folderpath = "gettingstart";
            var filename = "gettingstart.html";
            var content = fileStorage.ReadFile(folderpath, filename);
            topicContent.ContentText = content;
            topicContent.HeaderText = "Getting start Azure with python";
            return topicContent;
            //TopicContent topicContent = new TopicContent();
            //this.ShareName = "Azure";
            //using (pythonclouddbEntities dc = new pythonclouddbEntities())
            //{
            //    var result = dc.Contents.Where(w => w.SideBarId == Id).FirstOrDefault();
            //    topicContent.HeaderText = result.HeaderText;

            //    FileStorage fileStorage = new FileStorage(AppSetting.StorageConnectionString, this.ShareName.ToLower());
            //    var folderpath = result.Path.Substring(0, result.Path.LastIndexOf('/'));
            //    var filename = result.Path.Substring(result.Path.LastIndexOf('/') + 1);
            //    var content = fileStorage.ReadFile(folderpath, filename);
            //    topicContent.ContentText = content;
            //}
            //return topicContent;
        }
    }
    public class TopicContent
    {
        public string HeaderText { get; set; }

        public string ContentText { get; set; }
    }
}