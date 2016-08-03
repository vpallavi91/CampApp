'use strict';

angular.module('campusApp')
    .controller('AllocationController', function ($scope, Allocation, Fields) {
        $scope.allocations = [];
        $scope.pagination = {};
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : ''
        };
        $scope.fields = Fields.get('allocation');
        $scope.getFieldValue = Fields.getValue;
        $scope.getFieldLabel = Fields.getLabel;

        $scope.loadAll = function() {
            Allocation.query($scope.searchData, function(result, headers) {
                $scope.allocations = result;
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
            Allocation.get({id: id}, function(result) {
                $scope.allocation = result;
                $('#deleteAllocationConfirmation').modal('show');
            });
        };

        $scope.multipleDelete = function () {
            $http.post('/api/allocations/deletemultiple', {ids: getCheckedRowsIDs()})
                .success(function () {
                    $('#deleteMultipleConfirmation').modal('hide');
                    $scope.loadAll();
                });
        };

        $scope.confirmDelete = function (id) {
            Allocation.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteAllocationConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
            $scope.loadAll();
        };    

        $scope.markAll = function (checked) {
            $scope.allocations.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.showMultipleActions = function () {
            return getCheckedRows().length === 0 ? false : true;
        };

        function getCheckedRows () {
            return $scope.allocations.filter(function (entity) { return entity.checked;});
        }

        function getCheckedRowsIDs () {
            return getCheckedRows().map(function(entity){return entity._id;});
        }

        function saveCalback () {
            $scope.loadAll();
            $('#saveAllocationModal').modal('hide');
            $scope.clear();
        }

/*

        $scope.allocation = {};
        $scope.allocation.product = {};
        $scope.productnotfilled = true;
        $scope.done = false;
        $scope.products = [];
        $scope.page = 1;
        $scope.persons = [];
        
        $scope.searchData2 = {
            page: 1,
            perPage: 4,
            keyword : '',
            category:'',
            orderBy : 'name',
            orderDir : 'asc'
        };
         
          
                Person.query($scope.searchData, function(result, headers) {
                $scope.persons = result;
                
                
                });
               

        $scope.loadAll = function() {
              Product.query($scope.searchData2, function(result2, headers2) {
                $scope.products = result2;
                
                
                });
            Allocation.query( function(result, headers) {
                
                $scope.allocations = result;
                
                if($stateParams.idproduct && $scope.done==false )
        {
                 $scope.productnotfilled=false;
                  Product.get({id: $stateParams.idproduct}, function(result2) {
                    $scope.product = result2;
                    });
                $scope.allocation.product = $stateParams.idproduct;
                $('#saveAllocationModal').modal('show');
       

        } 
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

            $scope.create = function () {
            if($scope.allocation._id) {
                console.log('edit');
                 Product.get({id: $scope.allocation.product}, function(result2) {
                    $scope.product = result2;
                    var product=$scope.product;
                     product.isalloced=true;
                    //update the product
                    Product.update({id: product._id},product);
                    });
                Allocation.update({id: $scope.allocation._id}, $scope.allocation, $scope.saveCalback);
            }
            else {
                $scope.productnotfilled=true;
                $scope.done=true;
                if($scope.done)
                {
                    Product.get({id: $scope.allocation.product}, function(result2) {
                    $scope.product = result2;
                    var product=$scope.product;
                     product.isalloced=true;
                    //update the product
                    Product.update({id: product._id},product);
                    });
                }
                
               
                $('#saveAllocationModal').modal('hide');
                Allocation.save($scope.allocation, $scope.saveCalback);


            }
        };
      
        $scope.update = function (id) {
            Allocation.get({id: id}, function(result) {
                $scope.allocation = result;
                 Product.get({id: $scope.allocation.product}, function(result2) {
                    $scope.product = result2;
                    var product=$scope.product;
                     product.isalloced=false;
                    //update the product
                    Product.update({id: product._id},product);
                    });
                $('#saveAllocationModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Allocation.get({id: id}, function(result) {
                $scope.allocation = result;
                $('#deleteAllocationConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id,allocation) {
            Allocation.delete({id: id},
                function () {
                    Product.get({id: allocation.product}, function(result2) {
                    $scope.product = result2;
                    var product= $scope.product;
                    product.isalloced=false;
                    //update the product
                    Product.update({id: product._id},product);
                    });

                     
                    $scope.loadAll();

                    $('#deleteAllocationConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.allocation = {type: null, status: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };

        $scope.saveCalback = function () {
            $scope.loadAll();
            $('#saveAllocationModal').modal('hide');
              
            $scope.clear();
        };
        //  $scope.load = function (id) {
        // Product.get({id: id}, function(result) {
        // $scope.product = result;
        // });
        // };
       
        */

    });


