/**
 * @name            入口配置
 * @description     requireJS 配置
 */
(function () {
    'use strict';
    require.config({
        baseUrl: 'app',
        paths: {
            'jQuery': '../scripts/vendor/jquery.min',
            'angular': '../scripts/vendor/angular.min',
            'domReady': '../scripts/vendor/domReady',
            'angular-sanitize': '../scripts/vendor/angular-sanitize',
            'ui-bootstrap-tpls': '../scripts/vendor/ui-bootstrap-tpls-2.5.0.min',
            'angular-ui-router': '../scripts/vendor/angular-ui-router.min',
            'angular-translate': '../scripts/vendor/angular-translate',
            'select': '../scripts/vendor/select.min',
            'validate': '../scripts/vendor/jquery.validate.min',
            'ngValidate': '../scripts/vendor/angular-jquery-validate',
            'jsTree': '../scripts/vendor/jstree.min',
            'ngJsTree': '../scripts/vendor/ngJsTree.min',
            'jqGrid': '../scripts/vendor/jquery.jqGrid.min'
        },
        shim: {
            'angular': {
                exports: 'angular',
                deps: ['jQuery'],
                init: function () {
                    var originModule = angular.module;
                    angular.module = function () {
                        var newModule = originModule.apply(angular, arguments);
                        if (arguments.length >= 2) {
                            newModule.config([
                                '$controllerProvider',
                                '$compileProvider',
                                '$filterProvider',
                                '$provide',
                                function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                                    newModule.controller = function () {
                                        $controllerProvider.register.apply(this, arguments);
                                        return this;
                                    };
                                    newModule.directive = function () {
                                        $compileProvider.directive.apply(this, arguments);
                                        return this;
                                    };
                                    newModule.filter = function () {
                                        $filterProvider.register.apply(this, arguments);
                                        return this;
                                    };
                                    newModule.factory = function () {
                                        $provide.factory.apply(this, arguments);
                                        return this;
                                    };
                                    newModule.service = function () {
                                        $provide.service.apply(this, arguments);
                                        return this;
                                    };
                                    newModule.provider = function () {
                                        $provide.provider.apply(this, arguments);
                                        return this;
                                    };
                                    newModule.value = function () {
                                        $provide.value.apply(this, arguments);
                                        return this;
                                    };
                                    newModule.constant = function () {
                                        $provide.constant.apply(this, arguments);
                                        return this;
                                    };
                                    newModule.decorator = function () {
                                        $provide.decorator.apply(this, arguments);
                                        return this;
                                    };
                                }
                            ]);
                        }
                        return newModule;
                    };
                }
            },
            'domReady': ['angular'],
            'angular-ui-router': ['angular'],
            'ui-bootstrap-tpls': ['angular'],
            'angular-sanitize': ['angular'],
            'angular-translate': ['angular'],
            'select': ['angular'],
            'validate': ['jQuery'],
            'ngValidate': ['angular'],
            'jsTree': ['jQuery'],
            'jqGrid': ['jQuery'],
            'ui-bootstrap-tpls': ['angular'],
            'ngJsTree': ['angular']
        },
        deps: [
            'config/app.config.main',
            'config/app.config.route',
            'filters/app.filter.i18n',
            'directives/app.directive.sidebar',
            'services/app.service.base',
            'services/app.service.storage',
            'services/app.service.promise',
            'controllers/app.controller.main',
            'controllers/app.controller.modal',
            'bootstrap'
        ] //,
        // priority: [
        //     'angular'
        // ]
    });
}());