'use strict';
/**
 * @name            Network service
 * @description     service
 */
define([
    'app',
    'services/app.service.grid'
], function (app) {
    app.factory('networkService', ['baseService', 'gridService', function (baseService, gridService) {
        var self = {};
        /* 每个核心功能 service（router 对应）都必须包含以下方法块 */
        angular.extend(self, baseService, gridService); // 方法继承
        self.init = function (fn) {
            self = this;
            delete self.init;
            fn && fn(self);
        };
        /* 每个核心功能 service（router 对应）都必须包含以上方法块 */

        self.editNetwork = function (gridId, rowId) { // 编辑
            if (typeof rowId === 'undefined' || rowId === null) {
                self.super.alert(self.i18nString('MSG.NONETWORKSELECTED'));
            } else {
                self.super.showModal({
                    title: self.i18nString('NETWORK.EDITNETWORK'),
                    url: './app/views/modal/edit-modal.tpl.html',
                    data: {
                        name: angular.element('#' + gridId).getRowData(rowId).name
                    },
                    submit: function (data, modal) {
                        self.updateRowData(gridId, rowId, data);
                        modal.dismiss('cancel');
                    }
                });
            }
        };
        self.addNetwork = function (gridId) { // 创建网络
            self.super.showModal({
                title: self.i18nString('NETWORK.ADDNETWORK'),
                url: './app/views/modal/create-network.tpl.html',
                props: {
                    types: [{
                            id: 1,
                            name: self.i18nString('NETWORK.NETWORKTYPE.TYPE1')
                        },
                        {
                            id: 2,
                            name: self.i18nString('NETWORK.NETWORKTYPE.TYPE2')
                        }
                    ]
                },
                // ok: function (data) {
                //     console.log(data);
                // },
                submit: function (data, modal) { // Demo
                    var $grid = angular.element('#' + gridId);
                    var currentData = $grid.getRowData();
                    var id = currentData.length + 1;
                    data.id = id;
                    data.type = data.type.name;
                    // currentData.push(data);
                    self.addRowData(gridId, id, data);
                    console.log('ok')
                    // scope.refreshGrid(gridId, currentData);
                    modal.dismiss('cancel');
                }
            });
        };
        self.addSubNetwork = function (id) { // 添加子网络
            console.log('addSubNetwork:', id);
            self.super.showModal();
        };
        self.removeNetwork = function (gridId, rowId) { // 删除
            var rowData;
            if (typeof rowId === 'undefined' || rowId === null) {
                self.super.alert(self.i18nString('MSG.NONETWORKSELECTED'));
            } else {
                rowData = angular.element('#' + gridId).getRowData(rowId);
                console.log(rowData);
                self.super.confirm({
                    title: self.i18nString('MSG.CONFIRM.TITLE'),
                    message: self.i18nString('MSG.CONFIRM.REMOVEITEM', {
                        item: rowData.name || ''
                    }),
                    confirm: function (data, modal) {
                        self.delRowData(gridId, rowId[0]);
                        modal.dismiss('cancel');
                    },
                    otherBtn: self.i18nString('BTN.OTHER'),
                    other: function (ignore, modal) {
                        modal.dismiss('cancel');
                    }
                });
            }
        };
        return self;
    }]);
});