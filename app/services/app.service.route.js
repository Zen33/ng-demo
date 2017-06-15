'use strict';
/**
 * @name            Route service
 * @description     service
 */
define([
    'app',
    'services/app.service.grid'
], function (app) {
    app.factory('routeService', ['baseService', 'gridService', function (baseService, gridService) {
        var self = {};
        /* 每个核心功能 service（router 对应）都必须包含以下方法块 */
        angular.extend(self, baseService, gridService); // 方法继承
        self.init = function (fn) {
            self = this;
            delete self.init;
            fn && fn(self);
        };
        /* 每个核心功能 service（router 对应）都必须包含以上方法块 */



        self.editNode = function (gridId, rowId) { // 编辑
            if (typeof rowId === 'undefined' || rowId === null) {
                self.super.alert(self.i18nString('MSG.NONODESELECTED'));
            } else {
                self.super.showModal({
                    title: self.i18nString('ROUTER.EDITNODE'),
                    url: './app/views/modal/edit-modal.tpl.html',
                    data: {
                        name: angular.element('#' + gridId).getRowData(rowId).name
                    },
                    submit: function (data, modal) {
                        self.updateRowData(gridId, rowId, data);
                        modal.dismiss('cancel');
                    },
                    cancel: function () {
                        console.log('cancel');
                    }
                });
            }
        };
        self.removeNode = function (gridId, rowId) { // 删除
            if (typeof rowId === 'undefined' || rowId === null) {
                self.super.alert(self.i18nString('MSG.NONODESELECTED'));
            } else {
                self.delRowData(gridId, rowId[0]);
            }
        };
        return self;
    }]);
});