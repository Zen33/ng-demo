'use strict';
/**
 * @name            Grid directive
 * @description     directive
 */
define(['app'], function (app) {
    app.directive('jqGridFilter', ['$sniffer', 'gridService', function ($sniffer, gridService) { // jqGrid搜索
        return {
            restrict: 'A',
            // require: 'ngModel',
            // priority: 1,
            // require: '^ngJqGrid',
            scope: {
                data: '=',
                gridId: '@',
                rowId: '@'
            },
            // link: function (scope, element, attr, ngModel) {
            link: function (scope, element, attr) {
                if ($sniffer.hasEvent('input')) {
                    element.unbind('input');
                }
                element.unbind('keydown').unbind('change');
                // element.bind('blur keypress keydown', function (e) {
                element.bind('blur', function (e) {
                    //ngModel.$setViewValue();
                    // if (e.which === 13 || e.type === 'blur') {
                    gridService.filterData(scope, element.val());
                    scope.$apply(function () {
                        scope[scope.rowId] = null;
                        // ngModel.$setViewValue(null);
                    });
                    // }
                });
            }
        }
    }])
    .directive('ngJqGrid', ['$compile', '$cacheFactory', function ($compile, $cacheFactory) { // jqGrid指令
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                var table;
                var id = attrs.gridId;
                var gridDataCache = $cacheFactory.get('gridDataCache') || $cacheFactory('gridDataCache');
                if (id) {
                    scope.gridId = id;
                    scope.$watch(attrs.config, function (newValue) {
                        var loadCompleteFn;
                        if (newValue) {
                            loadCompleteFn = newValue.loadComplete;
                            element.children().empty();
                            table = angular.element('<table id="' + id + '"></table>');
                            element.append(table);
                            gridDataCache.put(id, null);
                            newValue.loadComplete = function () {
                                var originData;
                                loadCompleteFn && loadCompleteFn.apply(this, arguments);
                                if (!gridDataCache.get(id)) {
                                    originData = angular.isArray(arguments[0]) ? arguments[0] : arguments[0].rows;
                                    gridDataCache.put(id, angular.copy(originData));
                                    // console.log($cacheFactory.info());
                                }
                                $compile(angular.element('#' + id))(scope);
                            }
                            angular.element(table).jqGrid(newValue);
                        }
                    });
                }
            }
        };
    }]);
});