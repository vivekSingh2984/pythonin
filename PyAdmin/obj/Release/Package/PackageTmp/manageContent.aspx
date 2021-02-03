<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="manageContent.aspx.cs" Inherits="PyAdmin.manageContent" ValidateRequest="false" %>



<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <div class="col-2">
            <h5>Manage Content</h5>
        </div>
        <div class="col-10">
            <div class="form-group">
                <asp:DropDownList ID="shareNameDDL" runat="server" CssClass="form-control">
                    <asp:ListItem Value="">Select Area</asp:ListItem>
                    <asp:ListItem Value="Azure" Selected="True">Azure</asp:ListItem>
                    <asp:ListItem Value="AWS">AWS</asp:ListItem>
                </asp:DropDownList>
                <asp:DropDownList ID="DropDownList1" runat="server" CssClass="form-control">
                    <asp:ListItem Value="">Select Blog</asp:ListItem>
                    <asp:ListItem Value="Azure">Azure</asp:ListItem>
                    <asp:ListItem Value="AWS">AWS</asp:ListItem>
                </asp:DropDownList>
                <asp:CheckBox ID="CheckBox1" runat="server" CssClass="form-control" Text="Published" />
                <asp:LinkButton ID="previewBlog" runat="server" CssClass="form-control">Preview</asp:LinkButton>
            </div>
        </div>
    </div>
    <div class="row controllers">
        <div class="col-2">
        </div>
        <div class="col-10">
            <div class="form-group">
                <asp:TextBox ID="titleTxt" runat="server" CssClass="form-control" placeholder="Title" ></asp:TextBox>
                Title:
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-2"></div>
        <div class="col-10" style="padding: 5px;">
            <asp:TextBox ID="TextBox1" CssClass="editor" runat="server" Width="100%" TextMode="MultiLine" Height="300px" Visible="true"></asp:TextBox>
            <asp:Button runat="server" ID="htmlSubmit" CssClass="btn btn-primary" Text="Submit" OnClick="htmlSubmit_Click" />
        </div>
    </div>
    <script type="text/javascript">
        $(".editor").jqte();
    </script>
</asp:Content>
