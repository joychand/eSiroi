(function () {
    'use strict';

    angular
        .module('eRegApp')
        .factory('dept_dataFactory', ['$http', dept_dataFactory]);

    function dept_dataFactory($http) {
        var urlBase = 'api/ApplyRegistrationController/';
        var service = {

            getOnlineExecutantList: function (ackno) {
                return $http({
                    method: 'GET',
                    url: urlBase + ackno + '/excutantlist '
                });
            },

            
            getOnlineExecddlist: function (ackno) {
            return $http({
                method: 'GET',
                url: urlBase + ackno + '/execddllist'
            });
        }

        };

        return service;

        
    }
})();