'use strict';

angular.module('campusApp')
    .factory('Allocation', function ($resource ) {
        return $resource('api/allocations/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',isArray: false,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'getAsArray': {
                method: 'GET',isArray: true,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            
            'update': { method:'PUT' },
            'save': { method:'POST' }
        });
    });
