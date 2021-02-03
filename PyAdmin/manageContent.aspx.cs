using PyCloud.AzureClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PyAdmin
{
    public partial class manageContent : System.Web.UI.Page
    {
        public string ShareName { get; set; }

        public string DocPath { get; set; }
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                var result = GetContent();
                TextBox1.Text = result.ContentText;
                titleTxt.Text = result.HeaderText;
            }
        }

        protected void htmlSubmit_Click(object sender, EventArgs e)
        {
            SetContent();
        }
        public class TopicContent
        {
            public string HeaderText { get; set; }

            public string ContentText { get; set; }
        }
        private TopicContent GetContent()
        {
            TopicContent topicContent = new TopicContent();
            this.ShareName = this.shareNameDDL.SelectedValue;
            FileStorage fileStorage = new FileStorage(AppSetting.StorageConnectionString, this.ShareName.ToLower());
            var folderpath = "gettingstart";
            var filename = "gettingstart.html";
            var content = fileStorage.ReadFile(folderpath, filename);
            topicContent.ContentText = content;
            topicContent.HeaderText = "Getting Start";
            return topicContent;
        }

        private void SetContent()
        {
            this.ShareName = this.shareNameDDL.SelectedValue;
            FileStorage fileStorage = new FileStorage(AppSetting.StorageConnectionString, this.ShareName.ToLower());
            var folderpath = "gettingstart";
            var filename = "gettingstart.html";
            fileStorage.UpdateFile(folderpath, filename, TextBox1.Text);
        }
    }
}