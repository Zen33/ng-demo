'use strict';
/**
 * @name            VM controller
 * @description     controller
 */
define(['app'], function (app) {
    app.controller('VMCtrl', ['$scope', '$filter', function ($scope, $filter) {
        // $scope.string = $filter('idFilter')('370202198605049988');
    }]);
    // .filter('idFilter', function () {
    //     return function (id) {
    //         return id.substring(0, 6) + '********' + id.substring(14);
    //     };
    // });
});