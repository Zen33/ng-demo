'use strict';
/**
 * @name            Node controller
 * @description     controller
 */
define(['app'], function (app) {
    app.controller('NodeCtrl', ['$scope', '$stateParams', '$controller', '$q', 'assignService', 'nodeService', function ($scope, $stateParams, $controller, $q, assignService, nodeService) {
        var self = this;
        var query = $stateParams.query;
        var ctrGroup = {
            compute: 'ComputeCtrl',
            gateway: 'GatewayCtrl',
            vm: 'VMCtrl'
        };
        var loadDeps = function (deps) {
            var def = $q.defer();
            require(deps, function () {
                def.resolve();
            });
            return def.promise;
        };
        assignService($scope, [].slice.call(arguments, 5), true); // 每个核心功能 controller（router 对应）都必须包含此方法
        loadDeps(['controllers/app.controller.' + query]).then(function () {
            angular.extend(self, $controller(ctrGroup[query], {
                $scope: $scope
            }));
        })
        $scope.title = $scope.i18nString('NODE.' + query.toUpperCase());
        $scope.getNodeTemplateUrl = function () {
            return './app/views/node/' + query + '.tpl.html';
        };
        $scope.multipleModals = function () {
            $scope.super.showModal({
                title: $scope.title,
                url: './app/views/modal/demo.tpl.html',
                subModal: function () {
                    $scope.super.showModal({
                        title: $scope.i18nString('NODE.TITLE'),
                        url: './app/views/modal/demo.tpl.html',
                        size: 'md',
                        subModal: function () {
                            $scope.super.alert('Multiple Modals~');
                        }
                    });
                }
            });
        };
    }]);
});