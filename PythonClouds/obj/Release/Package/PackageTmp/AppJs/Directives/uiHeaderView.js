/// <reference path="../Views/Common/header.html" />
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('uiHeaderView', uiHeaderView);

    function uiHeaderView($location, $http, $route) {

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

    function uiHeaderViewController($scope, $location, $http, $route, $window, blockUI, ngToast, $sessionStorage, AuthServices, AccountServices,$rootScope) {
        $scope.UserLoggedIn = AuthServices.isLoggedIn();
        $scope.IsAdminUser = false;
        $scope.LoginModel = {};
        $scope.Login = function () {
            if ($scope["loginForm"].$valid) {
                $scope.isSubmit = true;
                var data = JSON.stringify($scope.LoginModel);
                console.log(data);
                AuthServices.init();
                AccountServices.Login(data)
                    .then(function (response) {
                        if (response != null && response.Response == 200) {
                            $sessionStorage.user = response;
                            blockUI.stop();
                            $window.localStorage.setItem('IsUserLogin', true);
                            $location.path("/dashboard");
                        }
                        else {
                            blockUI.stop();
                            ngToast.danger({
                                content: response.Message
                            });
                        }
                    });
                blockUI.stop();
            }
        }
        $scope.Logout = function () {
            delete $sessionStorage.user;
            delete $rootScope.user;
            $location.path("/login");
        }
        $scope.ShowAdminLink = function () {
            if (AuthServices.isLoggedIn()) {
                if ($sessionStorage.user.Role == 'Admin' || $sessionStorage.user.Role == 'SuperAdmin')
                    $scope.IsAdminUser = true;
            }
        }
        $scope.ShowAdminLink();
    }
});
