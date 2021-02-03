var url = WebPortalServer;
var library = url + "Scripts/";
var controller = url + "AppJs/Controllers/";
require.config({
    baseUrl: url + "AppJs",
    paths: {
        //define library
        'jquery': library + 'jquery-3.3.1.min',
        'bootstrap': library + 'bootstrap.min',
        'initBootstrap': "...wotever...",
        'angular': library + 'angular.min',
        'angular-route': library + 'angular-route.min',
        'blockUI': library + 'angular-block-ui.min',
        'ngToast': library + 'ngToast',
        'ngStorage': library + 'ngStorage',
        'ngSanitize': library + 'angular-sanitize.min',
        'angular-animate': library + 'angular-animate.min',
        'angular-messages': library + 'angular-messages.min',
        'angular-resource': library + 'angular-resource.min',
        'ngFileUpload': library + 'ng-file-upload.min',
        'ngPrism': library + 'ng-prism',
        'ngDialog': library + 'ngDialog',
        'hljs': library + 'angular-highlightjs',
        'highlight': library + 'highlight.min',
        'tinymce': library + 'tinymce/tinymce.min',
        'ui.tinymce': library +'angular-ui/tinymce',
        'angularAMD': 'angularAMD',
        //define controller here
        'UnauthorizedController': controller + 'UnauthorizedController',
        'HomeController': controller + 'HomeController',
        'LoginController': controller + 'LoginController',
        'ForgetController': controller + 'ForgetController',
        'ResetPasswordController': controller + 'ResetPasswordController',
        'SignupController': controller + 'SignupController',
        'VerifyEmailController': controller + 'VerifyEmailController',
        'AdminDashboardController': controller + 'AdminDashboardController',
        'UsersController': controller + 'UsersController',
        'AccountSettingsController': controller + 'AccountSettingsController',
        'AzureController': controller + 'azure/AzureController',
        'AwsController': controller + 'aws/AwsController',
        'PythonController': controller + 'python/PythonController'

    },
    shim: {
        "bootstrap": ['jquery'],
        'angular': { exports: 'angular' },
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'blockUI': ['angular'],
        'ngSanitize': ['angular'],
        'angular-animate': ['angular'],
        'angular-resource': ['angular'],
        'ngToast': ['ngSanitize'],
        'ngStorage': ['angular'],
        'angular-messages': ['angular'],
        'ngFileUpload': ['angular'],
        'ngDialog': ['angular'],
        'ngPrism': ['angular'],
        'ngWebSocket': ['angular'],
        'hljs': ['highlight', 'angular'],
        'ui.tinymce': ['tinymce','angular'],
    },
    //priority: ["app", "hls"],
    // kick start application
    deps: ['highlight','bootstrap','app']
});