'use strict';

angular.module('campusApp')
    .controller('ProductController', function ($http, $scope, Product, Category, $state, Allocation, Person, Fields) {
        $scope.products = [];
        $scope.pagination = {}; 

        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            category:'',
            orderBy : 'name',
            orderDir : 'asc'
        };
        $scope.categories = Category.query();

        $scope.fields = Fields.get('product');
        $scope.getFieldValue = Fields.getValue;
        $scope.getFieldLabel = Fields.getLabel;

        $scope.loadAll = function() {                
            Product.query($scope.searchData, function(result, headers) {
                $scope.products = result;
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
            $scope.allChecked=false;
                
        };
        $scope.loadAll();

         $scope.create = function () {
            if($scope.product._id) {
                Product.update({id: $scope.product._id}, $scope.product, $scope.saveCalback);
            }
            else {
                var product = $scope.product;
                var products = [];
                for(var i=0; i<$scope.product.quantity; i++)
                {
                    product.name= product.name+" "+i;
                    console.log(product.name);
                    products[i]=product;
                    Product.save(products[i], $scope.saveCalback);                
                }
            }
        };

        $scope.update = function (id) {
            Product.get({id: id}, function(result) {
                $scope.product = result;
                $('#saveProductModal').modal('show');
            });
        };

        $scope.createCategory = function () {
            Category.save($scope.category, $scope.saveCalback);
        };

        $scope.delete = function (id) {
            Product.get({id: id}, function(result) {
                $scope.product = result;
                $('#deleteProductConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Product.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteProductConfirmation').modal('hide');
                    $scope.clear();
                });
        };        
         $scope.multipleDelete=function  () {
            $scope.deleteProducts = getCheckedRowsIDs();
            $http.post('/api/products/deletemultiple', {ids: getCheckedRowsIDs()}) 
                .success(function () {
                    $('#deleteMultipleProductConfirmation').modal('hide');
                    $scope.loadAll();
                });
         }; 

        $scope.allocatemodal = function (id) {
            $state.go("allocation", { idproduct: id });
        };

        $scope.free = function (id) {
            Allocation.delete({id: id}, function () {
                $scope.loadAll();
            });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
            $scope.loadAll();
        };

        $scope.clear = function () {
            $scope.product = {name: null, type: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };

        $scope.markAll = function (checked) {
            $scope.products.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.showMultipleActions = function () {
            return getCheckedRows().length === 0 ? false : true;
        };

        function getCheckedRows () {
            return $scope.products.filter(function (entity) { return entity.checked;});
        }

        function getCheckedRowsIDs () {
            return getCheckedRows().map(function(entity){return entity._id;});
        }

        $scope.saveCalback = function () {
            $scope.loadAll();
            $('#saveProductModal').modal('hide');
            $('#saveCategoryModal').modal('hide');
            $scope.clear();
        };   
    });