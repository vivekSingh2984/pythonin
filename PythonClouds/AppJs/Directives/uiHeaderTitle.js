/// <reference path="../Views/Common/header.html" />
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('uiHeaderTitle', uiHeaderView);

    function uiHeaderView($location, $http, $route) {

        return {
            restrict: 'EA',
            templateUrl: function () {
                return 'AppJs/Views/Common/headerTitle.html';
            },
            scope: {
                value: "@"
            } 
        };
    } 
});
