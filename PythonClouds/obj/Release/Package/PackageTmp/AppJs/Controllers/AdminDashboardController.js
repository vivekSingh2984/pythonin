/// <reference path="../Directives/uiHeaderView.js" />
define(['app', 'Directives/uiAdminHeaderView', 'Directives/uiSideView'], function (app) {
    app.controller('AdminDashboardController', function ($scope, $location, $route, ngToast, $sce) {
        
        $scope.tinymceOptions = {
            onChange: function (e) {
                // put logic here for keypress and cut/paste changes
            },
            inline: false,
            plugins: 'advlist autolink link image lists charmap print preview code codesample',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | codesample'
        };

        var ctrl = this;

        this.updateHtml = function () {
            ctrl.tinymceHtml = $sce.trustAsHtml(ctrl.tinymce);
        };
    });
});
 