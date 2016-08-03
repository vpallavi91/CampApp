'use strict';

angular.module('campusApp')
    .factory('Config', function ($resource) {
        return $resource('api/config/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': { method:'POST' }
        });
    })
    .factory('ConfigHelper', function ($resource, Config) {
        var config = {};
        var load = function () {
            Config.query(function(result) {
                result.forEach(function (item) {
                    config[item.key] = item.value;
                });
            });
        };
        load();
        return {
            init: load,
            get: function (item) {
                return config(item);
            },
            getAll: function () {
                return config;
            },
            getArray: function () {
                var array = [];
                for(var k in config){
                    array.push({key: k, value: config[k]});
                }
                return array;
            }
        };
    });
