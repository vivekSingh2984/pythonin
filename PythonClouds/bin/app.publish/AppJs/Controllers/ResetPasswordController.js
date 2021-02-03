/// <reference path="../Directives/uiHeaderView.js" />
define(['app', 'Directives/uiHeaderView', 'factory/AccountServices'], function (app) {
    app.controller('ResetPasswordController', function ($scope, $location, $route, $routeParams, ngToast, $sce, $timeout, blockUI, AccountServices) {
        $scope.isvalid = false;
        if ($routeParams.id != "" && typeof ($routeParams.id) != 'undefined') {
            $scope.Token = $routeParams.id;
            blockUI.start();
            AccountServices.CheckPasswordToken($scope.Token)
                   .then(function (response) {
                       if (response != null) {
                           blockUI.stop();
                           $scope.isvalid = true;
                       }
                       else {
                           blockUI.stop();
                       }
                   });
            blockUI.stop();
        }
        $scope.ResetPassword = function () {
            if ($scope.resetPasswordForm.$valid) {
                $scope.isSubmit = true;
                blockUI.start();
                AccountServices.ResetPassword($scope.Token, $scope.password)
                    .then(function (response) {
                        if (response != null) {
                            blockUI.stop();
                            $scope.password = "";
                            $scope.resetPasswordForm.$setPristine();
                            ngToast.success({
                                content: "Update successfully"
                            });
                            $timeout(function () {
                                $location.path("/login");
                            });

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