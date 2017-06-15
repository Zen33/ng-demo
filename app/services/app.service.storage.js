'use strict';
/**
 * @name            Storage service
 * @description     service
 */
define(['app'], function (app) {
    app.service('storageService', function () {
        this.getStorage = function (id) { // 获取
            if (this.testStorage()) {
                return localStorage.getItem(id);
            }
            return null;
        };
        this.setStorage = function (id, data) { // 设置
            if (this.testStorage()) {
                localStorage.setItem(id, data);
            }
        };
        this.removeStorage = function (id) { // 删除
            if (this.testStorage()) {
                localStorage.removeItem(id);
            }
        };
        this.testStorage = function () { // 是否支持
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        };
    });
});