'use strict';

angular.module('campusApp')
    .factory('Reservation', function ($resource) {
        return $resource('api/reservations/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.datePayement = new Date(data.datePayement);
                    data.dateFrom = new Date(data.dateFrom);
                    data.dateTo = new Date(data.dateTo);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'save': { method:'POST' }
        });
    });
