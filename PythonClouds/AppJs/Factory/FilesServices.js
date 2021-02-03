define(['angularAMD'], function (app) {
    app.factory('FilesServices', FilesServices);
    function FilesServices($http, $q, APIURL) {
        var baseUrl = APIURL + 'api/FilesController/';
        var FilesServices = {};
        FilesServices.uploadFiles = uploadFiles;
        FilesServices.GetOcrType = GetOcrType;
        FilesServices.GetDigitalOcrLang = GetDigitalOcrLang;
        FilesServices.GetHwOcrLang = GetHwOcrLang;
        return FilesServices;
        function uploadFiles(formData) {
            var deffered = $q.defer();
            $http({

                url: baseUrl + 'SaveFile/',
                method: 'POST',
                headers: { 'Content-Type': undefined },
                transformRequest: function () {
                    return formData;
                }
            }).then(function (response) {

                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response);
            });
            return deffered.promise;

        }
        function GetOcrType() {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'GetOcrType',
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
        function GetDigitalOcrLang() {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'GetDigitalOcrLang',
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
        function GetHwOcrLang() {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'GetHwOcrLang',
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