/// <reference path="../Views/Common/header.html" />
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('jpgFileValid', jpgFileValid);

    function jpgFileValid($location, $http, $route) { 
        var validFormats = ['jpg', 'jpeg'];
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$validators.validFile = function () {
                    elem.bind('change', function () {
                        var value = elem.val(),
                            ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();

                        return validFormats.indexOf(ext) !== -1;
                    });
                };
            }
        };
    }
});
