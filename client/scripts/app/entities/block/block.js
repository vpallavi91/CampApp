'use strict';

angular.module('campusApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('block', {
                parent: 'entity',
                url: '/block',
                data: {
                    roles: ['block.show'],
                    pageTitle: 'campusApp.block.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/block/blocks.html',
                        controller: 'BlockController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('block');
                        $translatePartialLoader.addPart('room');
                        return $translate.refresh();
                    }]
                }
            })
            .state('blockDetail', {
                parent: 'entity',
                url: '/block/:id',
                data: {
                    roles: ['block.show'],
                    pageTitle: 'campusApp.block.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/block/block-detail.html',
                        controller: 'BlockDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('block');
                        $translatePartialLoader.addPart('room');
                        return $translate.refresh();
                    }]
                }
            });
    });
