'use strict';

angular.module('campusApp')
    .factory('Fields', function($filter) {
        var data = {
                user: {
                    username: {label: 'username', visible: true, sortable: true},
                    firstName: {label: 'firstName', visible: true},
                    lastName: {label: 'lastName', visible: true},
                    email: {label: 'email', visible: true},
                    roles: {label: 'roles', visible: false, callback: function (roles) {return roles.join(', ');}},
                    activated: {label: 'activated', visible: true, callback: function (activated) {return activated ? 'enabled' : 'disabled';}},
                    langKey: {label: 'langKey', visible: true}
                },
                person: {
                    code: {label: 'code', visible: true, sortable: true},
                    lastName: {label: 'lastName', visible: true, sortable: true},
                    firstName: {label: 'firstName', visible: true},
                    gender: {label: 'gender', visible: true, callback: $filter('genderConversion')},
                    birthDay: {label: 'birthDay', visible: true, callback: $filter('toDate')},
                    city: {label: 'city', visible: false},
                    country: {label: 'country', visible: false},
                    address: {label: 'address', visible: false},
                    description: {label: 'description', visible: false},
                    tel: {label: 'tel', visible: false},
                    type: {label: 'type', visible: false},
                    status: {label: 'status', visible: false},
                    isArchived: {label: 'archived', visible: false},
                    isBanned: {label: 'banned', visible: false},
                    updated: {label: 'updated', visible: false}
                },
                room: {
                    name: {label: 'name', visible: true, sortable: true},
                    floor: {label: 'floor', visible: true},
                    capacity: {label: 'capacity', visible: true, sortable: true},
                    free: {label: 'free', visible: true, sortable: true},
                    block: {label: 'block', visible: true, callback: function(a){return (a) ? a.name : '' ;}},
                    type: {label: 'type', visible: true, callback: function (a) {
                        return (a.block) ? $filter('genderConversion')(a.block.type) : '' ;
                    }}
                },
                block: {
                    name: {label: 'name', visible: true, sortable: true},
                    floors: {label: 'floors', visible: true},
                    count: {label: 'count', visible: true},
                    type: {label: 'type', visible: true, callback: $filter('genderConversion')}
                },
                product: {
                    name: {label: 'name', visible: true, sortable: true},
                    type: {label: 'type', visible: true},
                    category: {label: 'category', visible: true, callback: function(a){return (a) ? a.name : '' ;}}
                },
                category:{

                },
                allocation:{
                    person: {label: 'person', visible: true, callback: function(a){return (a) ? a.fullName : '' ;}},
                    product: {label: 'product', visible: true, callback: function(a){return (a) ? a.name : '' ;}},
                    status: {label: 'status', visible: true, callback: function (a) { return (a) ? 'valid' : 'invalid';}}
                },
                reservation:{
                    person: {label: 'person', visible: true, callback: function(a){return (a) ? a.fullName : '' ;}},
                    room: {label: 'room', visible: true, callback: function(a){return (a) ? a.name : '' ;}},
                    datePayement: {label: 'datePayement', visible: true, callback: $filter('toDate')},
                    dateFrom: {label: 'dateFrom', visible: true, callback: $filter('toDate')},
                    dateTo: {label: 'dateTo', visible: true, callback: $filter('toDate')},
                    status: {label: 'status', visible: true},
                    price: {label: 'price', visible: true}
                }
        };
        return {
            get: function(type) {
                return data[type];
            },
            getValue: function(entity, field){
                if(field.callback ){
                    if(!entity.hasOwnProperty(field.label)){
                        return field.callback(entity);
                    }
                    return field.callback(entity[field.label]);
                }
                return entity[field.label];
            },
            getLabel: function(entity, field) {
                return 'campusApp.'+ entity + '.' + field.label;
            }
        };
    });