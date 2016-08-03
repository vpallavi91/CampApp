'use strict';

angular.module('campusApp')
    .factory('Person', function ($resource, $filter) {
        return $resource('http://127.0.0.1:9000/api/persons/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.birthDay = $filter('amDateFormat')(data.birthDay, 'YYYY-MM-D');
                    return data;
                }
            },
            'update': { method:'PUT' },
            'save': { method:'POST' }
        });
    });
