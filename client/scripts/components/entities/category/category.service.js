'use strict';

angular.module('campusApp')
    .factory('Category', function ($resource ) {
        return $resource('api/categories/:id', {}, {
            'query': { method: 'GET', isArray: true},
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
    });
