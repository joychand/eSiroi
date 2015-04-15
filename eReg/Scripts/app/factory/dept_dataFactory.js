(function () {
    'use strict';

    angular
        .module('eRegApp')
        .factory('dept_dataFactory', ['$http', dept_dataFactory]);

    function dept_dataFactory($http) {
        var urlBase = 'api/ApplyRegistrationController/';
        var urlBase2 = 'api/deptRegistraionController/';
        var service = {

            /// GET ONLINE APPLICATION
            getOnlAppln: function(){
                return $http({
                    method: 'GET',
                    url: urlBase2 + 'getAppln'
                });
            },

            /// GET EXEMPT REASON LIST
            getExempReason: function(){
                return $http({
                    method: 'GET',
                    url: urlBase2 + '/ExemptReason',
                    cache: true
                });
            },

            // PROPERTY FORM DATA FACTORY
            getPropertyDetail: function(ackno){
                return $http({
                    method: 'GET',
                    url: urlBase2 + ackno + '/property'
                });
            },

            getPropertyddl: function(ackno){
                return $http({
                    method:'GET',
                    url: urlBase2 + ackno + '/propertyddl'
                });
            },

            // get landclass api
            getLandClass: function () {
                return $http({
                    method: 'GET',
                    url: urlBase2 + '/landclass',
                    cache: true
                })
            },
            // get LandType api
            getLandType: function () {
                return $http({
                    method: 'GET',
                    url: urlBase2 + '/landtype',
                    cache: true
                })
            },


            // EXECUTANT FORM DATA FACTORY
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
        }

        };

        return service;

        
    }
    angular.module('eRegApp').config(function (errorHandlerProvider, $provide) {

        errorHandlerProvider.decorate($provide, ['dept_dataFactory'])
    });
})();


