'use strict';
/**
 * @name            Promise service
 * @description     service
 */
define(['app'], function (app) {
    app.service('promiseService', ['$http', '$q', '$filter', function ($http, $q, $filter) { // promise
        this.cache = {};
        this.getUrlData = function (url) {
            var deferred = $q.defer();
            var promise = $http.get(url);
            promise.then(
                function (res) {
                    deferred.resolve(res);
                },
                function (res) {
                    // console.log(res);
                    console.warn('[Error:', res.status, ',', res.statusText, ' From URL:', url, ']');
                    deferred.reject(res.data);
                });
            return deferred.promise;
        };
    }]);
});