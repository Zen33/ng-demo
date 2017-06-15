'use strict';
/**
 * @name            Route controller
 * @description     controller
 */
define(['app'], function (app) {
    app.controller('RouteCtrl', ['$scope', 'assignService', 'routeService', function ($scope, assignService, routeService) {
        assignService($scope, [].slice.call(arguments, 2), true); // 每个核心功能 controller（router 对应）都必须包含此方法
        $scope.title = $scope.i18nString('ROUTER.TITLE');
        $scope.nodeData = [{
            id: "1111111111",
            name: "100.1.1.100",
            incloudManager: "100.1.1.100",
            status: "运行中",
            version: "1.0"
        }, {
            id: "222222",
            name: "100.1.1.101",
            incloudManager: "100.1.1.101",
            status: "未知",
            version: "1.0"
        }];
        $scope.nodeConfig = {
            datatype: 'local',
            height: 250,
            colNames: $scope.i18nArray('ROUTER.GRIDHEADNODE'),
            colModel: [{
                name: 'id',
                index: 'id',
                sorttype: 'string',
                hidden: true,
                key: true
            },
            {
                name: 'name',
                index: 'name',
                sorttype: 'string',
                align: 'center'
            },
            {
                name: 'incloudManager',
                index: 'ip',
                align: 'center'
            },
            {
                name: 'status',
                index: 'status',
                align: 'center'
            },
            {
                name: 'version',
                index: 'version',
                align: 'center'
            }],
            // width: null,
            autowidth: true,
            shrinkToFit: true,
            multiselect: true,
            onSelectRow: function () {
                $scope.getSelectedRow($scope, 'node', 'nodeRowId');
            },
            onSelectAll: function () {
                $scope.getSelectedRow($scope, 'node', 'nodeRowId');
            },
            // onSortCol: function () {
            //     $scope.$apply(function () {
            //         return $scope.rowId = null;
            //     });
            // },
            data: $scope.nodeData
        };
        $scope.incloudManagerData = [{
            id: "1111111111",
            name: "100.1.1.100",
            ip: "100.1.1.100",
            iCenter: "100.1.1.100",
            version: "1.0"
        }];
        $scope.incloudManagerConfig = {
            datatype: 'local',
            height: 250,
            colNames: $scope.i18nArray('ROUTER.GRIDHEADIM'),
            colModel: [{
                name: 'id',
                index: 'id',
                sorttype: 'string',
                hidden: true,
                key: true
            },
            {
                name: 'name',
                index: 'name',
                sorttype: 'string',
                align: 'center'
            },
            {
                name: 'ip',
                index: 'ip',
                align: 'center'
            },
            {
                name: 'iCenter',
                index: 'iCenter',
                align: 'center'
            },
            {
                name: 'version',
                index: 'version',
                align: 'center'
            }],
            // width: null,
            autowidth: true,
            shrinkToFit: true,
            multiselect: true,
            onSelectRow: function () {
                $scope.getSelectedRow($scope, 'incloudManager', 'imRowId');
            },
            onSelectAll: function () {
                $scope.getSelectedRow($scope, 'incloudManager', 'imRowId');
            },
            data: $scope.incloudManagerData
        };
    }]);
});