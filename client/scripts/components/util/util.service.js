'use strict';

angular.module('campusApp')
    .factory('Printer', ['$window', function($window) {
        return {
            print: function() {
	            $window.print();
	        }
        };
    }]);