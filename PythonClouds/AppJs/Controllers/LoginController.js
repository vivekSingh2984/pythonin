define(['app', 'Directives/uiHeaderView', 'Directives/uiFooterView', 'factory/AccountServices'], function (app) {
    app.controller('LoginController', function ($scope, $location, $sessionStorage, $route, $window, ngToast, $sce, blockUI, AccountServices) {
        $scope.LoginUser = function () {
            if ($scope.$root["loginForm"].$valid) {
                $scope.isSubmit = true;
                blockUI.start();
                AccountServices.Login($scope.email, $scope.password)
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
    });
});