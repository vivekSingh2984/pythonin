define(['app', 'Directives/uiHeaderView', 'Directives/htmlCompiler', 'Directives/uiFooterView', 'Directives/uiSideView', 'factory/HomeServices', 'factory/AccountServices'], function (app) {
    app.controller('PythonController', function ($scope, $sessionStorage, $location, $timeout, $route, ngToast, $sce, blockUI, HomeServices, AccountServices) {
        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
        $scope.LoadContent = function (id) {
            blockUI.start();
            HomeServices.GetAzureContent(id)
                .then(function (response) {
                    console.log(response)
                    $scope.body = response;
                    blockUI.stop();
                });
        }

        $scope.LoadContent($route.current.params['topic']);
        if ($location.search()['id'] === undefined) {
            console.log($location.search()['id'])
        }
        else {
            console.log($location.search()['id'])
            $scope.LoadContent($route.current.params['topic']);
        }
    });
});