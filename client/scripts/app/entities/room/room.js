'use strict';

angular.module('campusApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('room', {
                parent: 'entity',
                url: '/room',
                data: {
                    roles: ['room.show'],
                    pageTitle: 'campusApp.room.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/room/rooms.html',
                        controller: 'RoomController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('room');
                        $translatePartialLoader.addPart('block');
                        return $translate.refresh();
                    }]
                }
            })
            .state('roomMultiple', {
                parent: 'entity',
                url: '/room/multiple',
                data: {
                    roles: ['room.create'],
                    pageTitle: 'campusApp.room.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/room/room-multiple.html',
                        controller: 'RoomMultipleController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('room');
                        $translatePartialLoader.addPart('block');
                        $translatePartialLoader.addPart('person');
                        return $translate.refresh();
                    }]
                }
            })
            .state('roomDetail', {
                parent: 'entity',
                url: '/room/:id',
                data: {
                    roles: ['room.show'],
                    pageTitle: 'campusApp.room.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/room/room-detail.html',
                        controller: 'RoomDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('room');
                        $translatePartialLoader.addPart('block');
                        $translatePartialLoader.addPart('person');
                        return $translate.refresh();
                    }]
                }
            });
    });
