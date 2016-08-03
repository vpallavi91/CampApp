'use strict';

// 

angular.module('campusApp')
    .controller('PersonController', function ($scope, $http, Person, Fields) {
        $scope.persons = [];
        $scope.pagination = {};
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            orderBy : 'lastName',
            orderDir : 'asc'
        };
        $scope.fields = Fields.get('person');
        $scope.getFieldValue = Fields.getValue;
        $scope.getFieldLabel = Fields.getLabel;
        
        $scope.loadAll = function() {
            Person.query($scope.searchData, function(result, headers) {
                $scope.persons = result;
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
            Person.get({id: id}, function(result) {
                $scope.person = result;
                $('#deletePersonConfirmation').modal('show');
            });
        };

        $scope.multipleDelete = function () {
            $http.post('/api/persons/deletemultiple', {ids: getCheckedUsersIDs()})
                .success(function () {
                    $('#deleteMultipleConfirmation').modal('hide');
                    $scope.loadAll();
                });
        };

        $scope.confirmDelete = function (id) {
            Person.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deletePersonConfirmation').modal('hide');
                    $scope.clear();
                });
        };        

        $scope.markAll = function (checked) {
            $scope.persons.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
            $scope.loadAll();
        };

        $scope.clear = function () {
            $scope.person = {name: null, type: null, id: null};
        };

        function getCheckedUsers () {
            return $scope.persons.filter(function (entity) { return entity.checked;});
        }
        function getCheckedUsersIDs () {
            return getCheckedUsers().map(function(entity){return entity._id;});
        }

        $scope.showMultipleActions = function () {
            return getCheckedUsers().length === 0 ? false : true;
        };
        
        $scope.showSwitchAction = function () {
            return getCheckedUsers().length === 2 ? true : false;
        };

    });
