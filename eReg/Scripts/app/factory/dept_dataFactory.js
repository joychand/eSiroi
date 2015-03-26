(function () {
    'use strict';

    angular
        .module('eRegApp')
        .factory('dept_dataFactory', ['$http', dept_dataFactory]);

    function dept_dataFactory($http) {
        var urlBase = 'api/ApplyRegistrationController/';
        var urlBase2 = 'api/deptRegistraionController/';
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
            },

            postdeptexecutantlist: function (executantlist) {
                return $http({
                    method: 'POST',
                    data: executantlist,
                    url: urlBase2 + 'postexecutant'
                });
            },

            // CLAIMANT FORM DATAFACTORY

            getOnlineClaimantlist: function (ackno) {
            return $http({
                method: 'GET',
                url: urlBase2 + ackno + '/claimantlist '
            });
            },

            getclaimddlist: function (ackno) {
                return $http({
                    method: 'GET',
                    url: urlBase2 + ackno + '/claimddlist '
                });
            },


            // IDENTIFIER FORM DATAFACTORY

            getOnlineIdentifierlist: function (ackno) {
                return $http({
                    method: 'GET',
                    url: urlBase2 + ackno + '/identifierlist'
                })
            },

            getOnlineIdentddlist: function (ackno) {
            return $http({
                method: 'GET',
                url: urlBase2 + ackno + '/identddllist'
            })
            },
            // get landclass api
            getLandClass: function () {
                return $http({
                    method: 'GET',
                    url: urlBase2 + '/landclass',
                    cache: true
                })
            },

            getLandType: function () {
                return $http({
                    method: 'GET',
                    url: urlBase2 + '/landtype',
                    cache: true
                })
            }

        };

        return service;

        
    }
})();