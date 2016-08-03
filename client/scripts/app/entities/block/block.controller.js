'use strict';

angular.module('campusApp')
    .controller('BlockController', function ($scope, $http, Block, Fields) {
        $scope.blocks = [];
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            orderBy : 'name',
            orderDir : 'asc'
        };
        $scope.fields = Fields.get('block');
        $scope.getFieldValue = Fields.getValue;
        $scope.getFieldLabel = Fields.getLabel;

        $scope.loadAll = function() {
            Block.query($scope.searchData, function(result) {
                $scope.blocks = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            var entity = $scope.block;
            entity.rooms = [];
            if(entity._id) {
                Block.update({id: entity._id}, entity, saveCalback);
            }
            else {
                Block.save(entity, saveCalback);
            }
        };

        $scope.update = function (id) {
            Block.get({id: id}, function(result) {
                $scope.block = result;
                $('#saveBlockModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Block.get({id: id}, function(result) {
                $scope.block = result;
                $('#deleteBlockConfirmation').modal('show');
            });
        };

        $scope.multipleDelete = function () {
            $http.post('/api/blocks/deletemultiple', {ids: getCheckedBlocksIDs()})
                .success(function () {
                    $('#deleteMultipleConfirmation').modal('hide');
                    $scope.loadAll();
                });
        };

        $scope.confirmDelete = function (id) {
            Block.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteBlockConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
            $scope.loadAll();
        };

        $scope.clear = function () {
            $scope.block = {_id: null, name: null, floors: null, type: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };       

        $scope.markAll = function (checked) {
            $scope.blocks.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.showMultipleActions = function () {
            return getCheckedBlocks().length === 0 ? false : true;
        };

        function getCheckedBlocks () {
            return $scope.blocks.filter(function (entity) { return entity.checked;});
        }

        function getCheckedBlocksIDs () {
            return getCheckedBlocks().map(function(entity){return entity._id;});
        }

        function saveCalback () {
            $scope.loadAll();
            $('#saveBlockModal').modal('hide');
            $scope.clear();
        }
    });
