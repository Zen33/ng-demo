'use strict';
/**
 * @name            Gateway controller
 * @description     controller
 */
define(['app'], function (app) {
    app.controller('GatewayCtrl', ['$scope', function ($scope) {
        $scope.data = [{
            id: "1111111111",
            name: "10.22.22.33",
            controller: "100.1.1.100"
        }, {
            id: "222222",
            name: "100.1.1.101",
            controller: "100.1.1.101"
        }];
        $scope.config = {
            datatype: 'local',
            height: 250,
            colNames: $scope.i18nArray('NODE.GRIDHEADGATEWAYNODE'),
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
                name: 'controller',
                index: 'controller',
                align: 'center'
            }],
            // width: null,
            autowidth: true,
            shrinkToFit: true,
            multiselect: true,
            onSelectRow: function () {
                $scope.getSelectedRow($scope, 'gatewayNode', 'gnRowId');
            },
            onSelectAll: function () {
                $scope.getSelectedRow($scope, 'gatewayNode', 'gnRowId');
            },
            // onSortCol: function () {
            //     $scope.$apply(function () {
            //         return $scope.rowId = null;
            //     });
            // },
            data: $scope.data
        };
    }]);
});