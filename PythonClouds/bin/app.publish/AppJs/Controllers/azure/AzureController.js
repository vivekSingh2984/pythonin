define(['app', 'Directives/uiHeaderView', 'Directives/htmlCompiler', 'Directives/uiFooterView', 'Directives/uiSideView', 'factory/HomeServices', 'factory/AccountServices'], function (app) {
    app.controller('AzureController', function ($scope, $sessionStorage, $location, $timeout, $route, ngToast, $sce, blockUI, HomeServices, AccountServices) {
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
        $scope.bodyy = "<p>This program adds two numbers</p>\n<div hljs hljs-language='python'># This program adds two numbers\n";
        $scope.bodyy += "num1 = 1.5\n";
        $scope.bodyy += "num2 = 6.3\n";
        $scope.bodyy += "# Add two numbers\n";
        $scope.bodyy += "sum = num1 + num2\n";
        $scope.bodyy += "# Display the sum\n";
        $scope.bodyy += "print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))</div>";

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