define(['angularAMD'], function (app) {
    app.factory('AuthServices', AuthServices);
    function AuthServices($http, $resource, $rootScope, $sessionStorage, $q, APIURL) {
        /**
    *  User profile resource
    */  var baseUrl = APIURL + 'api/AccountsController/';
        var auth = {};
        auth.init = Init;
        auth.isLoggedIn = IsLoggedIn;
        auth.logout = logout;
        auth.checkPermissionForView = CheckPermissionForView;
        auth.userHasPermission = UserHasPermission;
        auth.ChangePassword = ChangePassword;
        return auth;
        /**
         *  Saves the current user in the root scope
         *  Call this in the app run() method
         */
        function Init() {
            if (auth.isLoggedIn()) {
                $rootScope.user = currentUser();
            }
        };
        function logout() {
            delete $sessionStorage.user;
            delete $rootScope.user; 
        };
        function CheckPermissionForView(view) {
            if (!view.requiresAuthentication) {
                return true;
            }

            return userHasPermissionForView(view);
        };
        function userHasPermissionForView(view) {
            if (!auth.isLoggedIn()) {
                return false;
            }
            if (!view.permissions || !view.permissions.length) {
                return true;
            }
            return auth.userHasPermission(view.permissions);
        };
        function UserHasPermission(permissions) {
            if (!auth.isLoggedIn()) {
                return false;
            }
            var found = false;
            angular.forEach(permissions, function (permission, index) {
                if ($sessionStorage.user.Role.indexOf(permission) >= 0) {
                    found = true;
                    return;
                }
            });
            return found;
        };
        function currentUser() {
            return $sessionStorage.user;
        };
        function IsLoggedIn() {
            return $sessionStorage.user != null;
        };
        function ChangePassword(_password) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'ChangePassword',
                method: 'POST',
                params: {
                    SubsId: $sessionStorage.user.SubscriberId,
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
    }
});