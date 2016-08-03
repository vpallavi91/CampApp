'use strict';

angular.module('campusApp')
    .factory('authInterceptor', function ($cookieStore) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            }

            // // Intercept 401s and redirect you to login
            // responseError: function(response) {
            //     if(response.status === 401) {
            //         var stateService = $injector.get('$state');
            //         stateService.go('login');
            //         // remove any stale tokens
            //         $cookieStore.remove('token');
            //         return $q.reject(response);
            //     }
            //     else {
            //         return $q.reject(response);
            //     }
            // }
        };
    });