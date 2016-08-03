'use strict';

angular.module('campusApp')
.filter('genderConversion', function(){
    return function(gender){
        return (gender) ? 'Female' : 'Male';
    };
})
.filter('role', function(){
    return function(roles){
        if(!roles) {return '';}
        return (roles.indexOf('ROLE_ADMIN') !== -1) ? 'admin'
                : (roles.indexOf('ROLE_MANAGER') !== -1) ? 'manager'
                : 'user';
    };
})
.filter('toDate', function (moment){
    return function(date){
        return moment(date).format('DD/MM/YYYY');
    };
});

