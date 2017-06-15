'use strict';
/**
 * @name            Landing
 * @description     Deps
 */
define([
    'angular',
    'angular-sanitize',
    'ui-bootstrap-tpls',
    'angular-ui-router',
    'angular-translate',
    'select',
    'jsTree',
    'ngJsTree',
    'jqGrid',
    'ngValidate'
], function (angular) {
    return angular.module('Hana', [
        'ui.bootstrap',
        'ngSanitize',
        'ui.router',
        'ui.select',
        'pascalprecht.translate',
        'ngJsTree',
        'angular-jquery-validate'
    ]);
});