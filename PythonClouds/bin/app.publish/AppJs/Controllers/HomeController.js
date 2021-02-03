/// <reference path="../Directives/uiHeaderView.js" />
define(['app', 'Directives/uiHeaderView', 'Directives/uiFooterView','Directives/uiSideView', 'factory/HomeServices', 'factory/AccountServices'], function (app) {
    app.controller('HomeController', function ($scope, $sessionStorage, $location, $timeout, $route, ngToast, $sce, blockUI, HomeServices, AccountServices) {
        $scope.HomeContent = [];
        HomeServices.GetHomeContent()
            .then(function (response) {
                $scope.HomeContent = response;
            });
    });
});