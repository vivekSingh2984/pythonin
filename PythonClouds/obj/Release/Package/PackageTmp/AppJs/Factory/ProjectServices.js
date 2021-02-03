define(['angularAMD'], function (app) {
    app.factory('ProjectServices', ProjectServices);
    function ProjectServices($http, $q, APIURL) {
        var baseUrl = APIURL + 'api/ProjectController/';
        var Project = {};
        Project.GetProjects = GetProjects;
        Project.AddProject = AddProject;
        Project.GetOcrType = GetOcrType;
        Project.GetDigitalOcrLang = GetDigitalOcrLang;
        Project.GetHwOcrLang = GetHwOcrLang;
        return Project;
        function AddProject(data) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'AddProject',
                method: 'POST',
                data: data,
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                datatype: 'json'

            }).then(function (response) {
                deferred.resolve(response.data);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }
        function GetProjects(subscriberId) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'GetProjects?subscriberId=' + subscriberId,
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