'use strict';


angular
    .module('campusApp')
    .controller('UserSaveController', function ($scope, User, ParseLinks, $stateParams, $timeout, $state, UserPassword) {

        $scope.isUpdate = !!($stateParams.id);

        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;

        $scope.load = function (id) {
            User.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };

        $scope.save = function () {
            $scope.entity.password = Math.random().toString(36);
            var cb = function (data) {
                $state.go('userDetail', {id: data._id});
            };

            if($scope.isUpdate) {
                User.update({id: $scope.entity._id}, $scope.entity, cb);
            }
            else {
                User.save($scope.entity, cb);
            }
        };

        $scope.changePassword = function () {
            if ($scope.password !== $scope.confirmPassword) {
                $scope.doNotMatch = 'ERROR';
            } else {
                $scope.doNotMatch = null;
                UserPassword.save({id: $scope.entity.id, password : $scope.password}, function () {
                    $scope.error = null;
                    $scope.success = 'OK';
                }, function () {
                    $scope.success = null;
                    $scope.error = 'ERROR';
                });
            }
        };


        $scope.clear = function () {
            $scope.entity = {id : null, login : null, email : null, tel: null, firstName: null, lastName: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();

            $scope.changePasswordForm.$setPristine();
            $scope.changePasswordForm.$setUntouched();

            if($scope.isUpdate){
                $scope.load($stateParams.id);
            }
        };

        $timeout($scope.clear);
        
    });
