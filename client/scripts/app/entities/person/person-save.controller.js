'use strict';


angular
    .module('campusApp')
    .controller('PersonSaveController', function ($scope, Person, ParseLinks, $stateParams, $timeout, $state) {

        $scope.isUpdate = !!($stateParams.id);

        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;

        $scope.load = function (id) {
            Person.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };

        $scope.save = function () {
            var cb = function (data) {
                $state.go('personDetail', {id: data._id});
            };

            if($scope.isUpdate) {
                Person.update({id: $scope.entity._id}, $scope.entity, cb);
            }
            else {
                Person.save($scope.entity, cb);
            }
        };


        $scope.clear = function () {
            $scope.entity = {id : null, login : null, email : null, barcode: null, cin: null, birthDay: null, gender: null, address: null, 
                zipCode: null, city: null, country: null, tel: null, description: null };
            $scope.personFrom.$setPristine();
            $scope.personFrom.$setUntouched();

            if($scope.isUpdate){
                $scope.load($stateParams.id);
            }
        };

        $timeout($scope.clear);
        
    });
