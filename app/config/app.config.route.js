'use strict';
/**
 * @name           route 配置文件
 * @description    route 配置
 */
define(['app'], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        var defaultState = 'admin.network';
        // $urlRouterProvider.otherwise('/');
        function loadDeps(deps) {
            return ['$q', function ($q) {
                var def = $q.defer();
                require(deps, function () {
                    def.resolve();
                });
                return def.promise;
            }];
        }
        $stateProvider
        .state('/', {
            url: '/'
        })
        .state('admin', {
            url: '/admin',
            // abstract: true
        })
        .state('admin.network', {
            url: '/system/network',
            templateUrl: './app/views/network/view.tpl.html',
            controller: 'NetworkCtrl',
            resolve: {
                load: loadDeps(['controllers/app.controller.network', 'services/app.service.network'])
            }
        })
        .state('admin.router', {
            url: '/system/router',
            templateUrl: './app/views/router/view.tpl.html',
            controller: 'RouteCtrl',
            resolve: {
                load: loadDeps(['controllers/app.controller.route', 'services/app.service.route'])
            }
        })
        .state('admin.node', { // 节点
            url: '/system/node/:query',
            templateUrl: './app/views/node/view.tpl.html',
            controller: 'NodeCtrl',
            resolve: {
                load: loadDeps(['controllers/app.controller.node', 'services/app.service.node'])
            }
        });
        // $urlRouterProvider.when('', 'admin/system/network');
        // $urlRouterProvider.when('/', 'admin/system/network');
        // $locationProvider.html5Mode(true).hashPrefix('!');
        $locationProvider.hashPrefix('');
        $stateProvider.state('otherwise', {
            url: '*path',
            template: '',
            controller: [
                '$state',
                function ($state) {
                    $state.go(defaultState);
                }
            ]
        });
    }]);
    return app;
});