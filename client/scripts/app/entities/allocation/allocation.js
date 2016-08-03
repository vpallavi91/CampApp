'use strict';

angular.module('campusApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('allocation', {
                parent: 'entity',
                url: '/allocation/:idproduct',
                data: {
                    roles: ['allocation.show'],
                    pageTitle: 'campusApp.allocation.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/allocation/allocations.html',
                        controller: 'AllocationController'
                    }
                },
                resolve: {
                  
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('allocation');
                        return $translate.refresh();
                    }]

                }
            })
            .state('allocationDetail', {
                parent: 'entity',
                url: '/allocation/:id',
                data: {
                    roles: ['allocation.show'],
                    pageTitle: 'campusApp.allocation.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/allocation/allocation-detail.html',
                        controller: 'AllocationDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('allocation');
                        $translatePartialLoader.addPart('product');
                        return $translate.refresh();
                    }]
                }
            })
            .state('allocationSave', {
                parent: 'entity',
                url: '/allocation/save/:person/:id',
                data: {
                    roles: ['allocation.create'],
                    pageTitle: 'campusApp.allocation.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/allocation/allocation-save.html',
                        controller: 'AllocationSaveController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('allocation');
                        $translatePartialLoader.addPart('person');
                        $translatePartialLoader.addPart('product');
                        return $translate.refresh();
                    }]
                }
            });
    });
