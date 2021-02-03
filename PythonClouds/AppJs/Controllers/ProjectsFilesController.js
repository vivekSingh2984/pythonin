/// <reference path="../Directives/uiHeaderView.js" />
define(['app', 'Directives/uiHeaderView', 'factory/ProjectServices'], function (app) {
    app.controller('ProjectsFilesController', function ($scope, $location, $window, $route, $filter, ngToast, $sce, blockUI, $sessionStorage, $routeParams, $websocket, ProjectServices, NotificationWebSocket) {
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
            $scope.interface.allowedExtensions(['jpg', 'zip']);
            //$scope.interface.setRequestUrl('upload.html');
            //$scope.interface.defineHTTPSuccess([/2.{2}/]);
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
            var validFiles = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);
            var lengthLimit = false;
            for (var i = 0; i < validFiles.length; i++) {
                if (validFiles[i].file.name.length > 100) {
                    lengthLimit = true;
                    validFiles[i].deleteFile();
                    if (i !== 0) i = i - 1;
                    continue;
                }
                var extn = validFiles[i].file.name.substr(validFiles[i].file.name.lastIndexOf('.') + 1);
                if (extn === "zip" || extn === "jpg")
                    $scope.files.push(validFiles[i].file);
                else
                    validFiles[i].deleteFile();
            }
        });
        $scope.UploadDocuments = function () {
            if ($scope.Metadata.length === 0) {

                alert('No data');
                return false;
            }
            if ($scope.files.length === 0) {

                alert('No Files');
                return false;
            }
            var formData = new FormData();
            formData.append("DocumentCaptureMap", angular.toJson($scope.Metadata));
            for (var i = 0; i < $scope.files.length; i++) {
                formData.append("uploadedFile", $scope.files[i]);
            }
        }
    });
});
