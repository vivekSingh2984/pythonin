define(['app', 'Directives/uiHeaderView', 'Directives/uiFooterView', 'factory/AccountServices'], function (app) {
    app.controller('SignupController', function ($scope, $location, $route, ngToast, $sce, $timeout, blockUI, AccountServices) {
        $scope.RegisterUser = function (userInfo) {
            if ($scope.$root["signForm"].$valid) {
                $scope.isSubmit = true;
                blockUI.start();
                var data = JSON.stringify(userInfo);
                AccountServices.RegisterUser(data)
                    .then(function (response) {
                        if (response != null && response.Response == 200) {
                            ngToast.success({
                                content: response.Message
                            });
                            blockUI.stop();
                            $timeout(function () {
                                $location.path("/login");
                            }, 2000);

                        }
                        else if (response.Response == 500 || response.Response == 404) {
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