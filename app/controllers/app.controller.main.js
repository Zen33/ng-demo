'use strict';
/**
 * @name            Main controller
 * @description     controller
 */
define(['app'], function (app) {
    app.controller('MainCtrl', ['$scope', '$filter', '$translate', 'sidebarTree', function ($scope, $filter, $translate, sidebarTree) {
        $scope.changeLanguage = function (langKey) { // 国际化切换
            $translate.use(langKey);
        };
        $scope.$root.currentLang = $translate.proposedLanguage() || $translate.use(); // 当前语言
        sidebarTree.forEach(function (tree) {
            tree.text = $filter('translate')(tree.text);
        });
        $scope.treeData = sidebarTree; // 当前sidebar数据
    }]);
});