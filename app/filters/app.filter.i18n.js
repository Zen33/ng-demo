'use strict';
/**
 * @name            i18 filter
 * @description     filter
 */
define(['app'], function (app) {
    app.filter('i18n', ['$filter', function ($filter) { // i18n => translate
        var translateFilter = $filter('translate');
        return function ($parse, $translate) {
            return translateFilter($parse, $translate);
        }
    }]);
});