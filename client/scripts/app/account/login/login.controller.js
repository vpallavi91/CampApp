'use strict';

angular.module('campusApp')
    .controller('LoginController', function ($rootScope, $scope, $state, $timeout, Auth, Principal) {
        $scope.errors = {};

        $timeout(function (){angular.element('[ng-model="username"]').focus();});
        $scope.login = function () {
            Auth.login({
                username: $scope.username,
                password: $scope.password
            }).then(function () {
                $scope.authenticationError = false;
                Principal.identity().then(function(account) {
                    $rootScope.account = account;
                });
                if (['register', 'logout'].indexOf($rootScope.previousStateName) !== -1) {
                    $state.go('home');
                } else {
                    $rootScope.back();
                }
            }).catch(function () {
                $scope.authenticationError = true;
            });
        };
    });
