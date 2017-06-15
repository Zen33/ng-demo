'use strict';
/**
 * @name            Sidebar directive
 * @description     directive
 */
define(['app'], function (app) {
    app.directive('ngSidebarMenu', ['$state', '$compile', '$timeout', function ($state, $compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                treeData: '=data'
            },
            controller: ['$scope', function ($scope) { // 菜单项配置
                var newId = 0;
                $scope.ignoreChanges = false;
                $scope.originData = [];
                $scope.treeConfig = {
                    core: {
                        multiple: false,
                        animation: true,
                        check_callback: true,
                        worker: true
                    },
                    types: {
                        folder: {
                            icon: 'ion-ios-folder'
                        },
                        default: {
                            icon: 'ion-document-text'
                        }
                    },
                    // plugins: ['types', 'checkbox'],
                    plugins: ['types'],
                    version: 1
                };
                $scope.refresh = function () {
                    $scope.ignoreChanges = true;
                    newId = 0;
                    angular.copy($scope.originalData, $scope.treeData);
                    $scope.treeConfig.version++;
                };
                $scope.expand = function () {
                    $scope.ignoreChanges = true;
                    $scope.treeData.forEach(function (node) {
                        node.state.opened = true;
                    });
                    $scope.treeConfig.version++;
                };
                $scope.collapse = function () {
                    $scope.ignoreChanges = true;
                    $scope.treeData.forEach(function (node) {
                        node.state.opened = false;
                    });
                    $scope.treeConfig.version++;
                };
                $scope.readyCB = function () {
                    $timeout(function () {
                        $scope.ignoreChanges = false;
                    });
                };
                $scope.applyModelChanges = function () {
                    return !$scope.ignoreChanges;
                };
            }],
            template: '<div js-tree="treeConfig" ng-model="treeData" should-apply="applyModelChanges()" tree="treeInstance" tree-events="ready:readyCB"></div>',
            link: function (scope, element, attrs) {
                var unregister = scope.$watch('treeData', function (newValue) {
                    if (newValue && newValue.length) {
                        unregister();
                        scope.originData = angular.copy(newValue);
                        $compile(element.contents())(scope);
                        $timeout(function () {
                            element.children().bind('select_node.jstree', function (ignore, data) {
                                var sref = data.node.a_attr.sref;
                                var tmpArr;
                                var url;
                                var param;
                                if (typeof sref === 'string') {
                                    if (sref.indexOf(',') > -1) {
                                        tmpArr = sref.split(',');
                                        url = tmpArr[0];
                                        param = scope.$eval(tmpArr[1]);
                                        $state.go(url, param);
                                    } else {
                                        $state.go(sref);
                                    }
                                }
                            });
                        });
                    }
                });
            }
        };
    }]);
});