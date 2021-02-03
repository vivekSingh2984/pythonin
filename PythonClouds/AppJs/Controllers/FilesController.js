/// <reference path="../Directives/uiHeaderView.js" />
define(['app', 'Directives/uiHeaderView', 'ngDroplet', 'factory/FilesServices'], function (app) {
    app.directive('progressbar', function ProgressbarDirective() {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'A',

            /**
             * @property scope
             * @type {Object}
             */
            scope: {
                model: '=ngModel'
            },

            /**
             * @property ngModel
             * @type {String}
             */
            require: 'ngModel',

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                //var progressBar = new ProgressBar.Path(element[0], {
                //    strokeWidth: 2
                //});

                //scope.$watch('model', function () {

                //    progressBar.animate(scope.model / 100, {
                //        duration: 1000
                //    });

                //});

                //scope.$on('$dropletSuccess', function onSuccess() {
                //    progressBar.animate(0);
                //});

                //scope.$on('$dropletError', function onSuccess() {
                //    progressBar.animate(0);
                //});

            }

        }

    });
    app.controller('FilesController', function ($scope, $location, $window, $route, $filter, ngToast, $sce, blockUI, $sessionStorage, $routeParams, $websocket, FilesServices) {
        var notify = Metro.notify;
        notify.setup({
            width: 300,
            duration: 1000
        });
        $scope.validFiles = {};
        $scope.files = [];
        $scope.Metadata = {};
        //@property interface @type {Object}
        $scope.interface = {};
        //@property uploadCount * @type {Number}
        $scope.uploadCount = 0;
        //@property success @type {Boolean}
        $scope.success = false;
        //@property error @type {Boolean}
        $scope.error = false;
        // Listen for when the interface has been configured.
        $scope.$on('$dropletReady', function whenDropletReady() {
            $scope.interface.allowedExtensions(['jpg', 'png']);
            //$scope.interface.setRequestUrl('upload.html');
            $scope.interface.defineHTTPSuccess([/2.{2}/]);
            //$scope.interface.useArray(false);
        });
        // Listen for when the files have been successfully uploaded.
        $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
            $scope.uploadCount = files.length;
            $scope.success = true;
            console.log(response, files);
            $timeout(function timeout() {
                $scope.success = false;
            }, 5000);
        });
        // Listen for when the files have failed to upload.
        $scope.$on('$dropletError', function onDropletError(event, response) {
            $scope.error = true;
            console.log(response);
            $timeout(function timeout() {
                $scope.error = false;
            }, 5000);
        });
        $scope.$on('$dropletFileAdded', function onDropletSuccess(event, response, files) {
            $scope.validFiles = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);
        });
        $scope.Remove = function (filename) {
            for (var i = 0; i < $scope.files.length; i++) {
                if ($scope.files[i].name === filename) {
                    $scope.files.splice(i, 1);
                    break;
                }
            }
            $scope.validFiles = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);
            for (var j = 0; j < $scope.validFiles.length; j++) {
                if ($scope.validFiles[j].file.name === filename) {
                    $scope.validFiles[j].deleteFile();
                    break;
                }
            }
        }
        $scope.UploadDocuments = function () {
            
             
            if ($scope.Metadata.length === 0) {

                alert('No data');
                return false;
            }
            
            var lengthLimit = false;
            for (var i = 0; i < $scope.validFiles.length; i++) {
                if ($scope.validFiles[i].file.name.length > 100) {
                    lengthLimit = true;
                    validFiles[i].deleteFile();
                    if (i !== 0) i = i - 1;
                    continue;
                }
                var extn = $scope.validFiles[i].file.name.substr($scope.validFiles[i].file.name.lastIndexOf('.') + 1);
                if (extn === "png" || extn === "jpg")
                    $scope.files.push($scope.validFiles[i].file);
                else
                    $scope.validFiles[i].deleteFile();
            }
            if ($scope.files.length === 0) {

                alert('No Files');
                return false;
            }
            $scope.Metadata.SubscriberId = $sessionStorage.user.SubscriberId;
            var formData = new FormData();
            formData.append("MetaData", angular.toJson($scope.Metadata));
            for (var i = 0; i < $scope.files.length; i++) {
                formData.append("uploadedFile", $scope.files[i]);
            }
            blockUI.start();
            FilesServices.uploadFiles(formData).then(function (response) {
                blockUI.stop();
                notify.create("This is a notify with additional class.", "", {
                    cls: "success"
                });
                $scope.UploadAgain();
            }, function (err) {
                blockUI.stop();
                notify.create("This is a notify with additional class.", "", {
                    cls: "dangor"
                });
            });
        }
        $scope.UploadAgain = function () {

            $scope.validFiles = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);
            for (var j = 0; j < $scope.validFiles.length; j++) {
                $scope.validFiles[j].deleteFile();
            }
            $scope.files = [];
        }
        $scope.GetOcrType = function () {
            FilesServices.GetOcrType().then(function (response) {
                if (response != null) {
                    $scope.OcrType = response;
                }
                else {
                    ngToast.danger({
                        content: response.Message
                    });
                }

            })
        }
        $scope.GetDigitalOcrLang = function () {
            FilesServices.GetDigitalOcrLang().then(function (response) {
                if (response != null) {
                    $scope.DigitalOcrLang = response;
                }
                else {
                    ngToast.danger({
                        content: response.Message
                    });
                }

            })
        }
        $scope.GetHwOcrLang = function () {
            FilesServices.GetHwOcrLang().then(function (response) {
                if (response != null) {
                    $scope.HwOcrLang = response;
                }
                else {
                    ngToast.danger({
                        content: response.Message
                    });
                }

            })
        }
        $scope.Init = function () {
            $scope.GetOcrType();
            $scope.GetDigitalOcrLang();
            $scope.GetHwOcrLang();
        }
        $scope.Init();
    });
});
