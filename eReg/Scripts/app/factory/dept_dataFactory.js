(function () {
    'use strict';

    angular
        .module('app')
        .factory('dept_dataFactory', ['$http', dept_dataFactory]);

    function dept_dataFactory($http) {
        var urlBase = '';
        var service = {



            getOnlineExecutantList: function (ackno) {
                return $http({
                    method: 'GET',
                    url: urlBase + ackno + '/'
                });
            }
        };

        return service;

        
    }
})();