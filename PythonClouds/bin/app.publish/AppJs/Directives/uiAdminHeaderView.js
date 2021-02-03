/// <reference path="../Views/Common/header.html" />
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('uiAdminHeaderView', uiHeaderView);

    function uiHeaderView($location, $http, $route) {

        return {
            restrict: 'E',
            templateUrl: function () {
                return 'AppJs/Views/Common/Adminheader.html';
            },
            scope: {

            },
            controller: uiAdminHeaderViewController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function uiAdminHeaderViewController($scope, $location, $http, $route, $window, AuthServices) {

        var vm = this;
        $scope.UserLoggedIn = false;
        if (AuthServices.isLoggedIn())
            $scope.UserLoggedIn = true;
        $scope.Logout = function () {
            AuthServices.logout();
            $location.path("/");
        };
    }
});
