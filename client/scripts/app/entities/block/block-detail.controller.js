'use strict';

angular.module('campusApp')
    .controller('BlockDetailController', function ($scope, $stateParams, Block) {
        $scope.block = {};
        $scope.load = function (id) {
            Block.get({id: id}, function(result) {
              $scope.block = result;
              $scope.block.count = $scope.block.rooms.length;
              $scope.block.floors = countFloors($scope.block.rooms);
              
              $scope.dataRooms = Array.apply(null, new Array($scope.block.floors)).map(function () {return {number:0, rooms: []};});
              $scope.block.rooms.forEach(function(room){
                if($scope.dataRooms[room.floor]){
                  $scope.dataRooms[room.floor].rooms.push(room);
                  $scope.dataRooms[room.floor].number = room.floor;
                }
              });

            });
        };
        $scope.load($stateParams.id);

        function countFloors(rooms){
          var floors = [];
          rooms.forEach(function(item){
            if(floors.indexOf(item.floor) === -1) {
              floors.push(item.floor);
            }
          });
          return Math.max.apply(Math, floors) + 1;
        }
    });