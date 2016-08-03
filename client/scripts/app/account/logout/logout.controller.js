'use strict';

angular.module('campusApp')
    .controller('LogoutController', function ($state, Auth) {
        Auth.logout();
        $state.go('login');
    });
