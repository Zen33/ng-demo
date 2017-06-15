'use strict';
/**
 * @name            Grid service
 * @description     service
 */
define([
    'app',
    'directives/app.directive.grid'
], function (app) {
    app.factory('gridService', ['$cacheFactory', function ($cacheFactory) { // grid
        var self = {
            gridCache: {}, // 缓存当前grid信息
            getGridData: function (gridId) { // 获取当前 grid 数据
                var gridDataCache = $cacheFactory.get('gridDataCache') || $cacheFactory('gridDataCache');
                return gridDataCache.get(gridId);
            },
            setGridData: function (gridId, data) { // 存储当前 grid 数据
                var gridDataCache = $cacheFactory.get('gridDataCache') || $cacheFactory('gridDataCache');
                if (arguments.length === 1) { // 当数据为空，清理当前存储数据
                    data = null;
                }
                gridDataCache.put(gridId, data);
            },
            getGridCache: function (gridId) { // 得到当前缓存数据
                if (typeof gridId === 'undefined') {
                    return self.gridCache;
                } else {
                    return self.gridCache[gridId];
                }
            },
            filterData: function (scope, val) { // 检索
                var $grid = angular.element('#' + scope.gridId);
                var keyName = $grid.getGridParam('keyName');
                var data = this.getGridData(scope.gridId);
                if (data.length) {
                    // scope.data.length = 0; // watch not fire
                    scope.data = [];
                    $grid.clearGridData();
                    data.forEach(function (datum) {
                        if (JSON.stringify(datum).indexOf(val) > -1) {
                            scope.data.push(datum);
                            $grid.addRowData(datum[keyName], datum);
                        }
                    });
                    $grid.trigger('reloadGrid');
                    // $grid.resetSelection();
                    // $grid.clearGridData().setGridParam({
                    //     data: scope.data
                    // }).trigger('reloadGrid');
                }
            },
            addRowData: function (gridId, rowId, rowData) { // 新增
                angular.element('#' + gridId).addRowData(rowId, rowData);
                self.refreshGrid(gridId);
                self.gridCache[gridId] && (self.gridCache[gridId][self.gridCache[gridId]['rowId']] = null);
            },
            delRowData: function (gridId, rowId) { // 删除
                angular.element('#' + gridId).delRowData(rowId);
                self.refreshGrid(gridId);
                self.gridCache[gridId] && (self.gridCache[gridId][self.gridCache[gridId]['rowId']] = null);
            },
            updateRowData: function (gridId, rowId, rowData) { // 更新
                var $grid = angular.element('#' + gridId);
                var keyName = $grid.getGridParam('keyName');
                var data = $grid.getRowData();
                data.forEach(function (datum) {
                    if (datum[keyName] === ('' + rowId)) {
                        angular.extend(datum, rowData);
                        return;
                    }
                });
                self.refreshGrid(gridId, data);
                self.gridCache[gridId] && (self.gridCache[gridId][self.gridCache[gridId]['rowId']] = null);
            },
            refreshGrid: function (gridId, data) { // 刷新
                var $grid = angular.element('#' + gridId);
                data = data || $grid.getRowData();
                self.setGridData(gridId, data);
                $grid.setGridParam({
                    data: data
                }).trigger('reloadGrid');
                // $grid.trigger('reloadGrid');
            },
            getSelectedRow: function (scope, gridId, rowIdName) { // 得到当前选中row id
                if (gridId === undefined || rowIdName === undefined) {
                    return;
                }
                var $grid = angular.element('#' + gridId);
                var multiselect = $grid.getGridParam('multiselect');
                var ids = multiselect ? $grid.getGridParam('selarrrow') : $grid.getGridParam('selrow');
                self.gridCache[gridId] = scope;
                self.gridCache[gridId]['rowId'] = rowIdName;
                scope.$apply(function () {
                    if (angular.isArray(ids) && ids.length !== 1) {
                        return scope[rowIdName] = null;
                    }
                    return scope[rowIdName] = ids.length ? ids : null;
                });
            }
        };
        return self;
    }]);
});