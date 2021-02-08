/// <reference path="../Views/Common/header.html" />
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('uiHeaderView', uiHeaderView);

    function uiHeaderView($location, $http, $route, HomeServices) {

        return {
            restrict: 'E',
            templateUrl: function () {
                return 'AppJs/Views/Common/header.html';
            },
            scope: {

            },
            controller: uiHeaderViewController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function uiHeaderViewController($scope, $location, $http, $route, $window, HomeServices, ngToast, $sessionStorage, AuthServices, AccountServices, $rootScope) {

        $scope.SiteTopMenu = [];
        $scope.LoadMenu = function () {
            HomeServices.GetTopMenu($rootScope.sideMenu)
                .then(function (response) {
                    console.log(response);
                    $scope.SiteTopMenu = response;
                    $window.sessionStorage.setItem('topMenu', JSON.stringify(response));
                });
        }
        if ($window.sessionStorage.getItem('topMenu') != undefined) {

            $scope.SiteTopMenu = JSON.parse($window.sessionStorage.getItem('topMenu'));
        }
        else {
            $scope.LoadMenu();
        }


    }
});
