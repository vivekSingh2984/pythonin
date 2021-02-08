/// <reference path="../Views/Common/header.html" />
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('uiSideView', ['AuthServices', uiSideView]);

    function uiSideView($location, $http, $route, blockUI, AuthServices, HomeServices) {

        return {
            restrict: 'E',
            templateUrl: function () {
                return 'AppJs/Views/Common/sideview.html';
            },
            scope: {

            },
            controller: uiSideViewController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function uiSideViewController($scope, $rootScope, $location, $http, $route, $window, blockUI, AuthServices, HomeServices) {
        $scope.sideMenuTitle = 'Navigation'
        if ($rootScope.sideMenu != undefined) {
            console.log($rootScope.sideMenu)
            $scope.SiteMenu = [];
            $scope.LoadMenu = function () {
                HomeServices.GetSideMenu($rootScope.sideMenu)
                    .then(function (response) {
                        console.log(response);
                        $scope.SiteMenu = response;
                        $window.sessionStorage.setItem($rootScope.sideMenu, JSON.stringify(response));
                    });
            }
            if ($window.sessionStorage.getItem($rootScope.sideMenu) != undefined) {
                
                $scope.SiteMenu = JSON.parse($window.sessionStorage.getItem($rootScope.sideMenu));
            }
            else {
                $scope.LoadMenu();
            }
            if ($rootScope.sideMenu == 'azure') {
                $scope.sideMenuTitle = 'Azure Resourse';
                
            }
        }
    }
});
