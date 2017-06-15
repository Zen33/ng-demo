'use strict';
/**
 * @name            Base service
 * @description     service
 */
define([
    'app',
    'services/app.service.assign'
], function (app) {
    app.factory('baseService', ['$filter', function ($filter) {
        var self = {
            proxy: function (fn) { // 代理
                var cache = {};
                return function () {
                    var args = Array.prototype.join.call(arguments, ',');
                    if (args in cache) {
                        return cache[args];
                    }
                    return cache[args] = fn.apply(this, arguments);
                };
            },
            i18nString: function (text, param) { // i18n 字符
                if (param && angular.isObject(param)) {
                    return $filter('translate')(text, param);
                } else {
                    return $filter('translate')(text);
                }
            },
            i18nArray: function (text, symbol) { // i18n 数组
                var translations = $filter('translate')(text);
                symbol = symbol || ',';
                return $filter('translate')(text).split(symbol);
            },
            connect: function () { // 建立关联
                this.shadow = this;
                this.super = this.$root;
            }
        };
        return self;
    }]);
});