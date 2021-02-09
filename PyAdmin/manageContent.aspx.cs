using PyCloud.AzureClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using PyCloud.Model;

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
                this.BindAreaDropDown();
            }
        }

        protected void htmlSubmit_Click(object sender, EventArgs e)
        {
            SetContent();
        }
        private void BindAreaDropDown()
        {
            var result = new GetTutorialContent().GetArea();
            AreaDropDown.DataSource = result;
            AreaDropDown.DataBind();
        }
        private void BindBlogDropDown(string section)
        {
            var result = new GetTutorialContent().GetBlog(section);
            BlogDropDown.Items.AddRange(result.ToArray());
        }
        private void GetContent()
        {
            var result = new GetTutorialContent().GetContent(this.BlogDropDown.SelectedValue);           
            TextBox1.Text = result.ContentText;
            titleTxt.Text = result.HeaderText;
        }

        private void SetContent()
        {
            //this.ShareName = this.shareNameDDL.SelectedValue;
            //FileStorage fileStorage = new FileStorage(AppSetting.StorageConnectionString, this.ShareName.ToLower());
            //var folderpath = "gettingstart";
            //var filename = "gettingstart.html";
            //fileStorage.UpdateFile(folderpath, filename, TextBox1.Text);
        }

        protected void AreaDropDown_SelectedIndexChanged(object sender, EventArgs e)
        {
            this.BindBlogDropDown(this.AreaDropDown.SelectedValue);
        }

        protected void BlogDropDown_SelectedIndexChanged(object sender, EventArgs e)
        {
            this.GetContent();
        }
    }
}