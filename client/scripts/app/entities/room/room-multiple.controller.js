'use strict';


angular
    .module('campusApp')
    .controller('RoomMultipleController', function ($scope, $state, $http) {
        $scope.block = {
            name: '',
            type: false,
            floors: []
        };

        $scope.create = function () {
            $http.post('/api/rooms/addmultiple', {data: $scope.block})
            .success(function (data) {
                $state.go('blockDetail', {id: data._id});
            });
        };

        $scope.addFloor = function () {
            $scope.block.floors.push({
                number: $scope.block.floors.length
            });
        };
        
    });
