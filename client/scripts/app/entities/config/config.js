'use strict';

angular.module('campusApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('config', {
                parent: 'entity',
                url: '/config',
                data: {
                    roles: ['config.update'],
                    pageTitle: 'campusApp.config.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/config/configs.html',
                        controller: 'ConfigController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('config');
                        return $translate.refresh();
                    }]
                }
            })
            .state('configDetail', {
                parent: 'entity',
                url: '/config/:id',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'campusApp.config.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/config/config-detail.html',
                        controller: 'ConfigDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('config');
                        return $translate.refresh();
                    }]
                }
            });
    });
