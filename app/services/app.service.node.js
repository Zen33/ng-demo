'use strict';
/**
 * @name            Node service
 * @description     service
 */
define([
    'app',
    'services/app.service.grid'
], function (app) {
    app.factory('nodeService', ['baseService', 'gridService', function (baseService, gridService) {
        var self = {};
        /* 每个核心功能 service（router 对应）都必须包含以下方法块 */
        angular.extend(self, baseService, gridService); // 方法继承
        self.init = function (fn) {
            self = this;
            delete self.init;
            fn && fn(self);
        };
        /* 每个核心功能 service（router 对应）都必须包含以上方法块 */


        self.addComputeNode = function () {
            self.super.alert('Add compute node.');
        };
       
        return self;
    }]);
});