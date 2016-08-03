'use strict';

angular.module('campusApp')
    .controller('ReservationController', function ($scope, $http, Reservation, Fields) {
        $scope.reservations = [];
        $scope.pagination = {};
        $scope.searchData = {
            page: 1,
            perPage: 2,
            keyword : '',
            orderBy : 'datePayement',
            orderDir : 'asc'
        };
        $scope.fields = Fields.get('reservation');
        $scope.getFieldValue = Fields.getValue;
        $scope.getFieldLabel = Fields.getLabel;

        $scope.loadAll = function() {
            Reservation.query($scope.searchData, function(result, headers) {
                $scope.reservations = result;
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

        $scope.delete = function (id) {
            Reservation.get({id: id}, function(result) {
                $scope.reservation = result;
                $('#deleteReservationConfirmation').modal('show');
            });
        };

        $scope.multipleDelete = function () {
            $http.post('/api/reservations/deletemultiple', {ids: getCheckedReservationsIDs()})
                .success(function () {
                    $('#deleteMultipleConfirmation').modal('hide');
                    $scope.loadAll();
                });
        };

        $scope.confirmDelete = function (id) {
            Reservation.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteReservationConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
            $scope.loadAll();
        };     

        $scope.markAll = function (checked) {
            $scope.reservations.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.showMultipleActions = function () {
            return getCheckedReservations().length === 0 ? false : true;
        };

        function getCheckedReservations () {
            return $scope.reservations.filter(function (entity) { return entity.checked;});
        }

        function getCheckedReservationsIDs () {
            return getCheckedReservations().map(function(entity){return entity._id;});
        }

        function saveCalback () {
            $scope.loadAll();
            $('#saveReservationModal').modal('hide');
            $scope.clear();
        }
    });