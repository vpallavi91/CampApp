'use strict';

angular.module('campusApp')
    .controller('UserDetailController', function ($scope, $stateParams, User) {
        $scope.user = {};
        $scope.load = function (id) {
            User.get({id: id}, function(result) {
                $scope.user = result;
                $scope.user.roles = getRoles($scope.user.roles);
            });
        };
        $scope.load($stateParams.id);

        function getRoles(roles){
            var authorities = {};
            roles.forEach(function(role){
                var table = role.split('.')[0];
                var action = role.split('.')[1];
                var data = authorities[table] || [];
                data.push(action);
                authorities[table] = data;
            });
            var data = Object.keys(authorities).map(function (item) {
                return {label: item, value: authorities[item]};
            })
            return data;
        }
    });