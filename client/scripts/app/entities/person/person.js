'use strict';

angular.module('campusApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('person', {
                parent: 'entity',
                url: '/persons',
                data: {
                    roles: ['person.show'],
                    pageTitle: 'campusApp.person.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/persons.html',
                        controller: 'PersonController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('person');
                        return $translate.refresh();
                    }]
                }
            })
            .state('personDetail', {
                parent: 'entity',
                url: '/person/:id',
                data: {
                    roles: ['person.show'],
                    pageTitle: 'campusApp.person.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/person-detail.html',
                        controller: 'PersonDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('person');
                        $translatePartialLoader.addPart('room');
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('allocation');
                        return $translate.refresh();
                    }]
                }
            })
            .state('personSave', {
                parent: 'entity',
                url: '/person/save/:id',
                data: {
                    roles: ['person.create'],
                    pageTitle: 'campusApp.person.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/person-save.html',
                        controller: 'PersonSaveController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('person');
                        return $translate.refresh();
                    }]
                }
            });
    });
