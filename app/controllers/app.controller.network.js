'use strict';
/**
 * @name            Network controller
 * @description     controller
 */
define(['app'], function (app) {
    app.controller('NetworkCtrl', ['$scope', 'assignService', 'networkService', function ($scope, assignService, networkService) {
        assignService($scope, [].slice.call(arguments, 2), true); // 每个核心功能 controller（router 对应）都必须包含此方法
        $scope.title = $scope.i18nString('NETWORK.TITLE');
        $scope.config = {
            url: './app/views/network/networkData.json',
            datatype: 'json',
            height: 250,
            colNames: $scope.i18nArray('NETWORK.GRIDHEADNETWORK'),
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
                name: 'subnet',
                index: 'subnet',
                align: 'center'
            },
            {
                name: 'vni',
                index: 'vni',
                align: 'center'
            },
            {
                name: 'type',
                index: 'type',
                align: 'center'
            },
            {
                name: 'action',
                index: 'action',
                align: 'center',
                formatter: function (ignore, rowData) {
                    var rowId = rowData.rowId;
                    return '<input type="button" value="' + $scope.i18nString('NETWORK.EDITNETWORK') + '" ng-click="editNetwork(\'' + $scope.gridId + '\',' + rowId + ')" />&nbsp;<input type="button" value="' + $scope.i18nString('NETWORK.ADDSUBNETWORK') + '" ng-click="addSubNetwork(' + rowId + ')" />';
                }
            }],
            // width: null,
            autowidth: true,
            shrinkToFit: true,
            multiselect: true,
            onSelectRow: function () {
                $scope.getSelectedRow($scope, 'network', 'netRowId');
            },
            onSelectAll: function () {
                $scope.getSelectedRow($scope, 'network', 'netRowId');
            },
            // onSortCol: function () {
            //     $scope.$apply(function () {
            //         return $scope.netRowId = null;
            //     });
            // },
            // data: $scope.data
            loadonce: true
        };
    }]);
});