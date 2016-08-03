'use strict';

angular.module('campusApp')
    .factory('AuthServerProvider', function loginService($http, $cookieStore) {
        return {
            login: function(credentials) {
                return $http.post('/auth/local', {
                  username: credentials.username,
                  password: credentials.password
                }).
                success(function(data) {
                  $cookieStore.put('token', data.token);
                  return data;
                });
            },
            logout: function() {
                $cookieStore.remove('token');
            },
            getToken: function () {
                var token = $cookieStore.get('token');
                return token;
            },
            hasValidToken: function () {
                var token = this.getToken();
                return !!token;
            }
        };
    });
