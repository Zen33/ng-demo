'use strict';
/**
 * @name            Modal controller
 * @description     controller
 */
define([
    'app'//,
    // 'controllers/app.controller.validate'
], function (app) {
    app.run(['$rootScope', '$uibModalStack',
        function ($rootScope, $uibModalStack) {
            $rootScope.$on('$stateChangeStart', function () {
                var openedModal = $uibModalStack.getTop();
                if (openedModal) {
                    $uibModalStack.dismiss(openedModal.key);
                }
            });
        }
    ])
    .controller('ModalCtrl', ['$scope', '$controller', '$uibModal', '$uibModalStack', function ($scope, $controller, $uibModal, $uibModalStack) {
        // angular.extend(this, $controller('ValidateCtrl', {
        //     $scope: $scope
        // }));
        $scope.$root.showModal = function (options) { // modal
            var defaults = {
                title: 'Modal',
                size: 'lg',
                props: {},
                data: {}
            };
            var opts = angular.extend({}, defaults, options);
            var modalInstance;
            if (!opts.url) {
                return;
            }
            $scope.opts = {
                backdrop: 'static',
                // backdropClick: true,
                // dialogFade: false,
                keyboard: false,
                templateUrl: opts.url,
                controller: 'ModalInstanceCtrl',
                resolve: {
                    item: function () {
                        return angular.copy(opts);
                    }
                },
                size: opts.size
            };
            modalInstance = $uibModal.open($scope.opts);
            modalInstance.result.then(function (res) {
                //on ok button press
                opts.ok && opts.ok(res);
            }, function () {
                //on cancel button press
                opts.cancel && opts.cancel();
                // console.log('Modal Closed');
            });
        };
        $scope.$root.confirm = function (options) { // confirm
            var defaults = {
                title: 'Confirm',
                size: 'md',
                data: {} //  otherBtn: balabala第三个按钮
            };
            var opts = angular.extend({}, defaults, options);
            var modalInstance;
            $scope.opts = {
                backdrop: 'static',
                keyboard: false,
                template: '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">&times;</button><h4 class="modal-title">{{\'MSG.CONFIRM.TITLE\' | i18n}}</h4></div><div class="modal-body">{{modal.message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="confirm()">{{\'BTN.CONFIRM\' | i18n}}</button><button class="btn btn-warning" type="button" ng-click="cancel()">{{\'BTN.CANCEL\' | i18n}}</button><button ng-show="modal.otherBtn" class="btn btn-warning" type="button" ng-click="other()">{{modal.otherBtn}}</button></div>',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    item: function () {
                        return angular.copy(opts);
                    }
                },
                size: opts.size
            };
            modalInstance = $uibModal.open($scope.opts);
            modalInstance.result.then(function () {}, function () {});
        };
        $scope.$root.alert = function (text) { // alert
            var modalInstance;
            text = text || '';
            $scope.opts = {
                backdrop: 'static',
                keyboard: false,
                template: '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">&times;</button><h4 class="modal-title">{{\'MSG.ALERT\' | i18n}}</h4></div><div class="modal-body">{{modal.message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">{{\'BTN.CONFIRM\' | i18n}}</button></div>',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    item: function () {
                        return angular.copy({
                            message: text
                        });
                    }
                },
                size: 'sm'
            };
            modalInstance = $uibModal.open($scope.opts);
            modalInstance.result.then(function () {}, function () {});
        };
    }])
    .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', '$uibModalStack', 'item', 'promiseService', 'baseService', function ($scope, $uibModalInstance, $uibModalStack, item, promiseService, baseService) {
        $scope.modal = item;
        $scope.whenTheDataChanged = true;
        $scope.originModalData; // 初始数据
        if (angular.isString(item.data)) {
            promiseService.getUrlData(item.data).then(function (res) {
                $scope.data = res.data;
                $scope.originModalData = angular.copy($scope.data);
            }, function (error) {
                console.log(error.statusText);
            });
        } else {
            $scope.data = item.data;
            $scope.originModalData = angular.copy($scope.data);
        }
        $scope.ok = function () { // 确定
            $uibModalInstance.close($scope.data);
        };
        $scope.submit = function () { // 提交
            $scope.whenTheDataChanged = false;
            $scope.modal.submit && $scope.modal.submit($scope.data, $uibModalInstance);
        };
        $scope.other = function () { // 其他
            $scope.modal.other && $scope.modal.other($scope, $uibModalInstance);
        };
        $scope.cancel = function () { // 取消
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirm = function () { // 确认
            $scope.modal.confirm && $scope.modal.confirm($scope, $uibModalInstance, $uibModalStack);
        };
        $scope.flag = true;
        $scope.$on('modal.closing', function (event, reason, closed) {
            // console.log('modal.closing: ' + (closed ? 'close' : 'dismiss') + '(' + reason + ')');
            var message = baseService.i18nString('MSG.CONFIRM.DATACHANGED');
            if (JSON.stringify($scope.data) !== JSON.stringify($scope.originModalData) && $scope.whenTheDataChanged === true) { // 数据内容变化
                switch (reason) {
                    // clicked outside
                    case 'backdrop click':
                        // message = '?';
                        break;
                        // cancel button
                    case 'cancel':
                        // message = '?';
                        break;
                        // escape key
                    case 'escape key press':
                        // message = '?';
                        break;
                }
                $scope.$root.confirm({
                    title: baseService.i18nString('MSG.CONFIRM.TITLE'),
                    message: message,
                    confirm: function (ignore, modal, allModals) {
                        $scope.whenTheDataChanged = false;
                        allModals.dismissAll();
                    }
                });
                event.preventDefault();
                // if (!confirm(message)) {
                //     event.preventDefault();
                // }
            }
        });
    }]);
});