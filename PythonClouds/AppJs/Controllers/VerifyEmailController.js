define(['app', 'Directives/uiHeaderView', 'factory/AccountServices'], function (app) {
    app.controller('VerifyEmailController', function ($scope, $location, $route, $routeParams, ngToast, $sce, $timeout, blockUI, AccountServices) {
        if ($routeParams.id != "" && typeof ($routeParams.id) != 'undefined') {
            $scope.Token = $routeParams.id;
            blockUI.start();
            AccountServices.VerifyEmail($scope.Token)
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
    });
});