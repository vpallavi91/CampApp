'use strict';

angular.module('campusApp')
    .controller('ReservationSaveController', function ($scope, $state, $stateParams, Person, Room, Block, Reservation, Fields) {
        $scope.person = {};
        $scope.entity = {};
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            isFree: 1,
            gender: true,
            orderBy : 'name',
            orderDir : 'asc'
        };
        $scope.rooms = [];
        $scope.fields = Fields.get('room');
        $scope.getFieldValue = Fields.getValue;
        $scope.pagination = {};

        $scope.load = function (id) {
            Person.get({id: id}, function(result) {
              $scope.person = result;
              $scope.entity.person = result._id;
              $scope.searchData.gender = result.gender;
              $scope.loadRooms();
            });
        };
        $scope.selectRoom = function(id){
            Room.get({id: id}, function(result) {
                $scope.room = result;
                $scope.entity.room = id;
                $('#roomModal').modal('hide');
            });
        };
        $scope.loadRooms = function(){
            Room.query($scope.searchData, function (result, headers) {
                $scope.rooms = result;
                $scope.count = headers('count');
                var pages = headers('pages');
                $scope.pagination.first = 1;
                $scope.pagination.prev = ($scope.searchData.page > 1 ) ? $scope.searchData.page - 1 : 0;
                $scope.pagination.next = ($scope.searchData.page + 1 <= pages ) ? $scope.searchData.page + 1 : 0;
                $scope.pagination.last = pages;
                $scope.allChecked = false;
            });
        };
        $scope.save = function(){
            Reservation.save($scope.entity, function (result) {
                $state.go('reservationDetail', {id: result._id});
            });
        };

        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadRooms();
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
            $scope.loadRooms();
        };

        $scope.load($stateParams.person);
    });
