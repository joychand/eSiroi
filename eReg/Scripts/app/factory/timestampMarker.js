(function () {
    'use strict';

    angular.module('eRegApp')
    .factory('timestampMarker', ['$q',function ($q) {
        var timestampMarker = {
            request: function (config) {
                config.requestTimestamp = new Date().getTime();
                return config;
            },
            response: function (response) {
                
                response.config.responseTimestamp = new Date().getTime();
                return response;
            },
            responseError: function (response) {
                if (response.status === 404) {
                    console.log("resource not found");
                    return $q.reject(response);
                }
            }


        };
        return timestampMarker;
    }]);
    angular.module('eRegApp').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('timestampMarker');
    }]);
})();
