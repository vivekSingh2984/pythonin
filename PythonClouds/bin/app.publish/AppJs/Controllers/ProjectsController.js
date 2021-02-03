/// <reference path="../Directives/uiHeaderView.js" />
define(['app', 'Directives/uiHeaderView', 'factory/ProjectServices'], function (app) {
    app.controller('ProjectsController', function ($scope, $location, $window, $route, $filter, ngToast, $sce, blockUI, $sessionStorage, $routeParams, $websocket, ProjectServices, NotificationWebSocket) {
        $scope.Project = {
            ProjectName :"",
            SubscriberId:$sessionStorage.user.SubscriberId
        };
        $scope.Projects = [];
        $scope.AddProject = function (Projectdata, ProjectForm) {
            blockUI.start();
            ProjectServices.AddProject(Projectdata).then(function (response) {
                if (response != null) {
                    blockUI.stop(); 
                    ngToast.success({
                        content: "Add Project successfully"
                    }); 

                }
                else {
                    blockUI.stop();
                    ngToast.danger({
                        content: response.Message
                    });
                }
                $scope.ProjectForm.$setPristine();
                $scope.GetProjectsList(Projectdata.SubscriberId);
            })
        }
        $scope.GetProjectsList = function (subscriberId) {
            
            ProjectServices.GetProjects(subscriberId).then(function (response) {
                if (response != null) {
                    $scope.Projects = response;
                }
                else {
                    ngToast.danger({
                        content: response.Message
                    });
                }
                 
            })
        }
        $scope.GetOcrType = function () {

            ProjectServices.GetOcrType().then(function (response) {
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

            ProjectServices.GetDigitalOcrLang().then(function (response) {
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

            ProjectServices.GetHwOcrLang().then(function (response) {
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
            $scope.GetProjectsList($sessionStorage.user.SubscriberId);
             
        }
        $scope.Init();
    });
});
