'use strict';

angular.module('campusApp')
    .controller('RoomController', function ($scope, $http, Room, Block, Fields) {
        $scope.rooms = [];
        $scope.pagination = {};
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            block: '',
            isFree: 0,
            orderBy : 'name',
            orderDir : 'asc'
        };
        $scope.blocks = Block.query();
        $scope.fields = Fields.get('room');
        $scope.getFieldValue = Fields.getValue;
        $scope.getFieldLabel = Fields.getLabel;

        $scope.loadAll = function() {
            Room.query($scope.searchData, function(result, headers) {
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
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            if($scope.room._id) {
                Room.update({id: $scope.room._id}, $scope.room, saveCalback);
            }
            else {
                Room.save($scope.room, saveCalback);
            }
        };

        $scope.update = function (id) {
            Room.get({id: id}, function(result) {
                $scope.room = result;
                $('#saveRoomModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Room.get({id: id}, function(result) {
                $scope.room = result;
                $('#deleteRoomConfirmation').modal('show');
            });
        };

        $scope.multipleDelete = function () {
            $http.post('/api/rooms/deletemultiple', {ids: getCheckedRoomsIDs()})
                .success(function () {
                    $('#deleteMultipleConfirmation').modal('hide');
                    $scope.loadAll();
                });
        };

        $scope.confirmDelete = function (id) {
            Room.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteRoomConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
            $scope.loadAll();
        };

        $scope.clear = function () {
            $scope.room = {_id: null, name: null, floor: null, capacity: null, free: null, block: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };       

        $scope.markAll = function (checked) {
            $scope.rooms.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.showMultipleActions = function () {
            return getCheckedRooms().length === 0 ? false : true;
        };

        function getCheckedRooms () {
            return $scope.rooms.filter(function (entity) { return entity.checked;});
        }

        function getCheckedRoomsIDs () {
            return getCheckedRooms().map(function(entity){return entity._id;});
        }

        function saveCalback () {
            $scope.loadAll();
            $('#saveRoomModal').modal('hide');
            $scope.clear();
        }
    });
