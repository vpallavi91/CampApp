'use strict';

angular.module('campusApp')
    .controller('AllocationSaveController', function ($scope, $state, $stateParams, Person, Product, Block, Allocation, Fields) {
        $scope.person = {};
        $scope.entity = {};
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            isFree: 1,
            orderBy : 'name',
            orderDir : 'asc'
        };
        $scope.products = [];
        $scope.fields = Fields.get('product');
        $scope.getFieldValue = Fields.getValue;
        $scope.pagination = {};

        $scope.load = function (id) {
            Person.get({id: id}, function(result) {
              $scope.person = result;
              $scope.entity.person = result._id;
              $scope.loadProducts();
            });
        };
        $scope.selectProduct = function(id){
            Product.get({id: id}, function(result) {
                $scope.product = result;
                $scope.entity.product = id;
                $('#productModal').modal('hide');
            });
        };
        $scope.loadProducts = function(){
            Product.query($scope.searchData, function (result, headers) {
                $scope.products = result;
                $scope.count = headers('count');
                var pages = headers('pages');
                $scope.pagination.first = 1;
                $scope.pagination.prev = ($scope.searchData.page > 1 ) ? $scope.searchData.page - 1 : 0;
                $scope.pagination.next = ($scope.searchData.page + 1 <= pages ) ? $scope.searchData.page + 1 : 0;
                $scope.pagination.last = pages;
            });
        };
        $scope.save = function(){
            Allocation.save($scope.entity, function () {
                $state.go('personDetail', {id: $scope.person._id});
            });
        };

        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadProducts();
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
            $scope.loadProducts();
        };

        $scope.load($stateParams.person);
    });
