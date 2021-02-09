/// <reference path="Controllers/LoginController.js" />
'use strict';

define(['angularAMD', 'angular-route', 'blockUI', 'ngToast', 'ngStorage', 'ngSanitize', 'ngDialog', 'angular-animate', 'angular-messages', 'angular-resource', 'ngFileUpload', 'hljs', 'ui.tinymce', 'factory/AuthServices', 'factory/AccountServices'], function (angularAMD) {
    var ToastConfig = ['ngToastProvider',
        function ToastConfigFn(ngToastProvider) {
            ngToastProvider.configure({
                animation: 'slide',
                horizontalPosition: 'right',
                verticalPosition: 'top',
                maxNumber: 0,
                combineDuplications: true,
                timeout: 10000
            });
        }];
    var windowAPIServer = WebPortalServer;
    var app = angular.module("app", ['ngRoute', 'blockUI', 'ngToast', 'ngStorage', 'ngDialog', 'ngSanitize', 'ngAnimate', 'ngMessages', 'ngResource', 'ngFileUpload', 'hljs', 'ui.tinymce']).config(ToastConfig);

    app.constant("APIURL", windowAPIServer);
    app.config(function (hljsServiceProvider) {
        hljsServiceProvider.setOptions({
            // replace tab with 4 spaces

        });
    });
    hljs.initHighlightingOnLoad();
    app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

        $locationProvider.hashPrefix('');
        $routeProvider.when("/errorauth", angularAMD.route({
            templateUrl: 'AppJs/Views/Common/unauthorized.html', controller: 'UnauthorizedController'
        }))
            .when("/home", angularAMD.route({
                templateUrl: 'AppJs/Views/Home/index.html', controller: 'HomeController',
                data: { sidemenu: 'home' }
            }))
            .when("/login", angularAMD.route({
                templateUrl: 'AppJs/Views/SignUpIn/login.html', controller: 'LoginController'
            }))
            .when("/forgetpassword", angularAMD.route({
                templateUrl: 'AppJs/Views/SignUpIn/forgetpassword.html', controller: 'ForgetController'
            }))
            .when("/resetpassword/:id", angularAMD.route({
                templateUrl: 'AppJs/Views/SignUpIn/resetpassword.html', controller: 'ResetPasswordController'
            }))
            .when("/signup", angularAMD.route({
                templateUrl: 'AppJs/Views/SignUpIn/signup.html', controller: 'SignupController'
            }))
            .when('/azure/', { redirectTo: '/azure/getting-start' })
            .when("/azure/:topic", angularAMD.route({
                templateUrl: 'AppJs/Views/Azure/azure.html', controller: 'AzureController',
                data: { sidemenu: 'azure' },

            }))
            .when("/aws", angularAMD.route({
                templateUrl: 'AppJs/Views/Aws/aws.html', controller: 'AwsController',
                data: { sidemenu: 'aws' }
            }))
            .when('/python/', { redirectTo: '/python/python-getting-start' })
            .when("/python/:topic", angularAMD.route({
                templateUrl: 'AppJs/Views/python/python.html', controller: 'PythonController',
                data: { sidemenu: 'python' },

            }))
            .when("/dashboard", angularAMD.route({
                templateUrl: 'AppJs/Views/Dashboard/dashboard.html', controller: 'DashboardController'//, requiresAuthentication: true,
                //permission: ['Admin', 'SuperAdmin']

            }))
            .when("/admindashboard", angularAMD.route({
                templateUrl: 'AppJs/Views/Administrator/dashboard.html', controller: 'AdminDashboardController'//, requiresAuthentication: true,
                //permission: ['Admin']
            })).otherwise({ redirectTo: '/home' });
    }]);
    app.run(['$rootScope', '$location', 'AuthServices', function ($rootScope, $location, AuthServices) {
        AuthServices.init();
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!AuthServices.checkPermissionForView(next)) {
                event.preventDefault();
                $location.path("/errorauth");
            }
            if (next['data'] !== undefined)
                $rootScope.sideMenu = next['data'].sidemenu;
        });
    }]);

    return angularAMD.bootstrap(app);
});