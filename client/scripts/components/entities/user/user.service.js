'use strict';

angular.module('campusApp')
    .factory('User', function ($resource) {
        return $resource('api/users/:id', {}, {
                'query': {method: 'GET', isArray: true},
                'get': {
                    method: 'GET',
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data;
                    }
                },
                'update': { method:'PUT' },
                'save': { method:'POST' }
            });
        })
   .factory('Password', function ($resource) {
        return $resource('api/users/me/change_password', {}, {});
    })
    .factory('Activate', function ($resource) {
        return $resource('api/users/activate/:activated', {}, {});
    })
    .factory('Account', function ($resource) {
        return $resource('api/users/me', {}, {});
    })
    .factory('Register', function ($resource) {
        return $resource('api/users/register', {}, {});
    })
    .factory('UserPassword', function ($resource) {
        return $resource('api/users/change_password', {}, {});
    });
