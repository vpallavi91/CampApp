'use strict';

angular.module('campusApp')
    .controller('AllocationDetailController', function ($scope, $stateParams, Allocation) {
        $scope.allocation = {};
        $scope.load = function (id) {
            Allocation.get({id: id}, function(result) {
              $scope.allocation = result;
            });
        };
        $scope.load($stateParams.id);
    });
