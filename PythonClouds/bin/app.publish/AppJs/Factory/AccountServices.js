define(['angularAMD'], function (app) {
    app.factory('AccountServices', AccountServices);
    function AccountServices($http, $q, APIURL) {
        var baseUrl = APIURL + 'api/AccountController/';
        var Account = {};
        Account.Login = Login;
        Account.ForgetPassword = ForgetPassword;
        Account.CheckPasswordToken = CheckPasswordToken;
        Account.ResetPassword = ResetPassword;
        Account.RegisterUser = RegisterUser;
        Account.VerifyEmail = VerifyEmail;
        return Account;

        function Login(data) {
            var deferred = $q.defer();
            $http({

                url: baseUrl + 'Login',
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
         
        function ForgetPassword(_userName) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'ForgetPassword',
                method: 'POST',
                params: {
                    UserName: _userName
                },
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                datatype: 'json'

            }).then(function (response) {
                deferred.resolve(response.data);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function CheckPasswordToken(_token) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'CheckPasswordToken',
                method: 'POST',
                params: {
                    Token: _token
                },
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                datatype: 'json'

            }).then(function (response) {
                deferred.resolve(response.data);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function ResetPassword(_token, _password) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'ResetPassword',
                method: 'POST',
                params: {
                    Token: _token,
                    Password: _password
                },
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                datatype: 'json'

            }).then(function (response) {
                deferred.resolve(response.data);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }
        
        function RegisterUser(data) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'RegisterUser',
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

        function VerifyEmail(_token) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'VerifyEmail',
                method: 'POST',
                params: {
                    Token: _token
                },
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