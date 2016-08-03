'use strict';

angular.module('campusApp')
    .controller('ProductDetailController', function ($scope, $stateParams, Product, Allocation) {
        $scope.product = {};
        $scope.load = function (id) {
            Product.get({id: id}, function(result) {
                $scope.product = result;
            });
        };
        $scope.load($stateParams.id);
    });
