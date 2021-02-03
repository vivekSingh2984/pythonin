/// <reference path="../Directives/uiHeaderView.js" />
define(['app', 'Directives/uiHeaderView', 'Directives/uiFooterView', 'factory/HomeServices', 'factory/AccountServices'], function (app) {
    app.controller('FilesViewController', function ($scope, $sessionStorage, $location, $timeout, $route, ngToast, $sce, blockUI, HomeServices, AccountServices) {
        var ctrl = this;
        var firstload = false;
        $scope.showpagestab = true;
        $scope.pagelist = [];
        $scope.pagelist.push({
            ordinal:1,
            isSelected: false,
            isDone: false,
            pageName: "Page " + 1
        });
        $scope.Images = 'http://localhost:5516/img/advanced-feature-2.jpg';
        $scope.imageInfo = {
            origH: 0,
            origW: 0,
            curH: 0,
            curW: 0,
            zoomPer: 0
        };
        $scope.zoomin = function (zoomvalue) {
            AutoMarkingStatus = false;
            AcroFields = false;
            if (zoomvalue == undefined || zoomvalue == null)
                $scope.imageInfo.zoomPer += 10;

            var origH = $scope.imageInfo.origH + ($scope.imageInfo.origH * $scope.imageInfo.zoomPer / 100.0);
            var origW = $scope.imageInfo.origW + ($scope.imageInfo.origW * $scope.imageInfo.zoomPer / 100.0);


            $('.myzoom').css('width', origW);
            $('.myzoom').css('height', origH);


        };
        $scope.zoomout = function () {
            AutoMarkingStatus = false;
            AcroFields = false;

            $scope.imageInfo.zoomPer -= 10;

            var origH = $scope.imageInfo.origH + ($scope.imageInfo.origH * $scope.imageInfo.zoomPer / 100.0);
            var origW = $scope.imageInfo.origW + ($scope.imageInfo.origW * $scope.imageInfo.zoomPer / 100.0);



            $('.myzoom').css('width', origW - 5);
            $('.myzoom').css('height', origH);


        };
        ctrl.canvasinit = function () {
            // Find the canvas element.
            // Get the Image Info. and set the height and width of all canvas to orignal size of image.
            var image = $("#pageImg");
            $scope.imageInfo.origH = image.height();
            $scope.imageInfo.origW = image.width();
            $scope.imageInfo.curH = $scope.imageInfo.origH;
            $scope.imageInfo.curW = $scope.imageInfo.origW;
            // we will come back to you later..
            $('.myzoom').css('width', $scope.imageInfo.origW);
            $('.myzoom').css('height', $scope.imageInfo.origH);
            canvaso = document.getElementById('imageView');
            if (!canvaso) {
                return;
            }
            canvaso.width = $scope.imageInfo.origW;
            canvaso.height = $scope.imageInfo.origH;
            if (!canvaso.getContext) {
                return;
            }
            BB = canvaso.getBoundingClientRect();
            offsetX = BB.left;
            offsetY = BB.top;
            // Get the 2D canvas context.
            contexto = canvaso.getContext('2d');
            contexto.strokeStyle = "red";
            contexto.lineWidth = "5";
            if (!contexto) {
                return;
            }
        }
        ctrl.bindFormPages = function (formPagesUrl) {
            $scope.pagelist = formPagesUrl;
            $scope.pagelist.forEach(function (page) {
                page.isSelected = false;
                page.isDone = false;
                page.pageName = "Page " + 1;
            });

            if (formPagesUrl[0]) {
                formPagesUrl[0].isSelected = true;
                // NOTE: set isDone to True to display page as done on ui.

                //$rootScope.$broadcast('selection', formPagesUrl[0]);
            }
        };
        $('#pageImg').on('load', function () {

            blockUI.start();
            if (typeof (contexto) == "undefined")
                ctrl.canvasinit();
            if (firstload == false) {
                $scope.imageInfo.zoomPer = Math.round(($("#divworkspace").width() * 100) / $scope.imageInfo.origW - 100);
                firstload = true;
            }

            $scope.zoomin($scope.imageInfo.zoomPer);

            blockUI.stop();
        });
    })
});