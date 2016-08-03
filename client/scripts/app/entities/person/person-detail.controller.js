'use strict';

angular.module('campusApp')
    .controller('PersonDetailController', function ($scope, $stateParams, Person, Block, Allocation) {
        $scope.entity = {};

        $scope.load = function (id) {
            Person.get({id: id}, function(person) {
                $scope.entity = person;
                $scope.entity.reservation = person.reservations.pop();
                if($scope.entity.reservation){
                    Block.get({id: $scope.entity.reservation.room.block}, function(block) {
                        $scope.entity.reservation.room.block = block;
                    });
                }
            });
        };
        $scope.load($stateParams.id);
    });
