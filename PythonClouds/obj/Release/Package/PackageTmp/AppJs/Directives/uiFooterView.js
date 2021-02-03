/// <reference path="../Views/Common/header.html" />
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('uiFooterView', uiFooterView);

    function uiFooterView($location, $http, $route) {

        return {
            restrict: 'E',
            templateUrl: function () {
                return 'AppJs/Views/Common/footer.html';
            },
            scope: {

            },
            controller: uiFooterViewController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function uiFooterViewController($scope, $location) {

         
    }
});
