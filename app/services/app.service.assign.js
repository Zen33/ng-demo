'use strict';
/**
 * @name            Assign service
 * @description     service
 */
define(['app'], function (app) {    
    app.factory('assignService', function () { // 指令分配，主要用于实现 scope 与 service 方法名一致
        var assign = function (child, parent) {
            Object.keys(parent).forEach(function (prop) {
                if (typeof parent[prop] === 'function' && !child.hasOwnProperty(prop)) {
                    child[prop] = parent[prop];
                }
            });
            parent.hasOwnProperty('init') && parent.init.call(child); // 作用域传递
        };
        return function (child, parents) {
            if (angular.isArray(parents)) {
                parents.forEach(function (parent) {
                    assign(child, parent);
                });
            } else {
                assign(child, parents);
            }
            child.hasOwnProperty('connect') &&  child.connect.call(child);
            return child;
        };
    });
});