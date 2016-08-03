'use strict';

angular.module('campusApp')
    .controller('ConfigController', function ($scope, $http, Config, ConfigHelper) {
        $scope.entity = ConfigHelper.getAll();

        $scope.setFile = function(element){
            $scope.file = element.files[0];
        };

        $scope.save = function() {
            var formData = new FormData();
            ConfigHelper.getArray().forEach(function(item){
                formData.append(item.key, item.value);
            });
            if($scope.file){
                formData.append('icon', $scope.file);
            }
            $http.post('/api/config', formData, {
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
            }).
            success(function (data, status, headers, config) {
                ConfigHelper.init();
            }).
            error(function (data, status, headers, config) {
                alert('failed!');
            });
        };
    });
