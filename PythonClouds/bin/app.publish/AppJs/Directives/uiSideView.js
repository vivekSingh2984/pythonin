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

    function uiSideViewController($scope, $rootScope, $location, $http, $route, $window, blockUI, $localStorage, AuthServices, HomeServices) {
        $scope.sideMenuTitle = 'Navigation'
        if ($rootScope.sideMenu != undefined) {
            console.log($rootScope.sideMenu)
            $scope.SiteMenu = [];
            $scope.LoadMenu = function () {
                HomeServices.GetSideMenu($rootScope.sideMenu)
                    .then(function (response) {
                        $scope.SiteMenu = response;
                        $window.localStorage.setItem($rootScope.sideMenu, JSON.stringify(response));
                    });
            }
            if ($window.localStorage.getItem($rootScope.sideMenu) != undefined) {
                
                $scope.SiteMenu = JSON.parse($window.localStorage.getItem($rootScope.sideMenu));
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
