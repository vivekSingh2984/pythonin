/// <reference path="../Directives/uiHeaderView.js" />
define(['app', 'Directives/uiHeaderView','factory/AccountServices'], function (app) {
    app.controller('ForgetController', function ($scope, $location, $route, ngToast, $sce, blockUI, AccountServices) {
        $scope.ForgetPassword = function () {
            if ($scope.forgetpasswordForm.$valid) {
                $scope.isSubmit = true;
                blockUI.start();
                AccountServices.ForgetPassword($scope.email)
                    .then(function (response) {
                        if (response != null && response.Response == 200) {
                            ngToast.success({
                                content: response.Message
                            });
                            blockUI.stop();
                            $scope.email = "";
                            $scope.forgetpasswordForm.$setPristine(); 
                        }
                        else {
                            blockUI.stop();
                            ngToast.danger({
                                content: response.Message
                            });
                            $scope.email = null;
                        }
                    });
                blockUI.stop();
            }
        }
    });
});