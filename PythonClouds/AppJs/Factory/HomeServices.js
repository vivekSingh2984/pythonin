define(['angularAMD'], function (app) {
    app.factory('HomeServices', HomeServices);
    function HomeServices($http, $q, APIURL) {
        var baseUrl = APIURL + 'api/ImageController/';
        var Feature = {};
        Feature.GetSideMenu = GetSideMenu;
        Feature.GetHomeContent = GetHomeContent;
        Feature.GetAzureContent = GetAzureContent;
        Feature.GetTopMenu = GetTopMenu;
        return Feature;
        function ImageCountHome() {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'ImageCountHome',
                method: 'GET',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                datatype: 'json'

            }).then(function (response) {
                deferred.resolve(response.data);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function GetSideMenu(section) {
            var deferred = $q.defer();
            $http({
                url: APIURL + 'api/Common/GetSideMenu/' + section,
                method: 'GET',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                datatype: 'json'

            }).then(function (response) {
                deferred.resolve(response.data);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function GetHomeContent() {
            var deferred = $q.defer();
            $http({
                url: APIURL + 'api/Common/GetHomeContent',
                method: 'GET',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                datatype: 'json'

            }).then(function (response) {
                deferred.resolve(response.data);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function GetTopMenu() {
            var deferred = $q.defer();
            $http({
                url: APIURL + 'api/Common/GetTopMenu',
                method: 'GET',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                datatype: 'json'

            }).then(function (response) {
                deferred.resolve(response.data);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function GetAzureContent(topic) {
            var deferred = $q.defer();
            $http({
                url: APIURL + 'api/AzureContent/GetAzureContent/' + topic,
                method: 'GET',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                datatype: 'json'

            }).then(function (response) {
                deferred.resolve(response.data);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }
    }
});