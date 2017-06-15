'use strict';
/**
 * @name            触发器
 * @description     初始化工作
 */
define([
    'angular',
    'app'
], function (angular, app) {
    require(['domReady!'], function (document) {
        var $http = angular.injector(['ng']).get('$http');
        /* Dev Mode Begin */
        (function (origin) {
            angular.modules = [];
            angular.module = function () {
                if (arguments.length > 1) {
                    angular.modules.push(arguments[0]);
                }
                return origin.apply(null, arguments);
            }
        })(angular.module);
        /* Dev Mode End */
        function fetchI18n() { // 获取国际化信息
            var defaultI18n = document.querySelector('body').getAttribute('data-i18n');
            var i18nUrl = './app/i18n/app.i18n.' + defaultI18n + '.json';
            app.constant('currentLang', defaultI18n);
            return $http.get(i18nUrl).then(function (res) {
                app.constant('translations', res.data);
            }, function (res) {
                console.warn('[Error:', res.status, ',', res.statusText, ' From URL:', i18nUrl, ']');
            });
        }
        function fetchSidebarTree() { // 获取菜单
            var treeUrl = './app/config/menuData.json';
            return $http.get(treeUrl).then(function (res) {
                app.constant('sidebarTree', res.data);
            }, function (res) {
                console.warn('[Error:', res.status, ',', res.statusText, ' From URL:', treeUrl, ']');
            });
        }
        fetchI18n().then(function () {
            fetchSidebarTree().then(function () {
                angular.bootstrap(document, ['Hana']);
            });
        });
    });
});