(function () {
    'use strict';

    angular
        .module('app')
        .factory('dept_dataFactory', ['$http', dept_dataFactory]);

    function dept_dataFactory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();