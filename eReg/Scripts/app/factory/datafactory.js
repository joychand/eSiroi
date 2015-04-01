﻿/// <reference path = ~/scripts/angular.js />

/// <reference path = ~/scripts/app/controller/registrationController.js>

angular.module('eRegApp')
    .factory('dataFactory', ['$http', function ($http) {

        var urlBase = '/api/Districts';
        var urlBase2 = '/api/SubDivisions';
        var urlBase3 = '/api/ApplyRegistrationController/';
        var urlBase4 = 'api/OnlineExecutants';
        var dataFactory = {};
        var ackno = 0

        dataFactory.getSRO = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + '/getSRO',
                cache: true
            })
        },
        dataFactory.getTransName = function (maj_code) {
            return $http({
                method: 'GET',
                url: urlBase3 + maj_code + '/trans_name'
            }).then(function (results) {
               
                return results.data;
            });
        }

        dataFactory.getDistricts = function () {
            return $http.get(urlBase).then(function (results) {
                return results.data;
            });
        };
        dataFactory.getAckno = function () {
            ackno = ackno + 1;
            return ackno;

        }
        dataFactory.getSubDivisions = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'subdivisions',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };
        dataFactory.getRevSubDivisions = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'Revsubdivision',
                cache: true
            }).then(function (result) {
                return result.data;
            });
        }

        dataFactory.getStates = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'state',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };

        dataFactory.getPoliceStations = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'villages',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };

        dataFactory.getPostOffices = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'postoffices',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };

        dataFactory.getVillages = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'villages',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };
        dataFactory.getMajortransaction = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'MajorTrans_code',
                cache: true
            });
        };
        dataFactory.getCircle = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'Circle',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };

        dataFactory.getRevVillage = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'RevVillage',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };

        // post onlineApplication
        dataFactory.postonlineapplication = function (onlineapplication) {
            return $http({
                method: 'POST',
                url: urlBase3 + 'postapplication',
                data: onlineapplication
            });//.then(function (results) { return results.data; });
        }

        //post executant

        dataFactory.postexecutant = function (executantList) {
            return $http({
                method:'POST',
                url: 'api/ApplyRegistrationController/postexecutant',
                data: executantList
                });
        };

        // post claimant
        dataFactory.postclaimant = function (claimantList) {
            return $http({
                method: 'POST',
                url: 'api/ApplyRegistrationController/postclaimant',
                data: claimantList
            });
            
        };

        // post Identifier
        dataFactory.postidentifier = function (identifierList) {
            return $http({
                method: 'POST',
                url: 'api/ApplyRegistrationController/postidentifier',
                data: identifierList
            });
            
        };



      
        //post property
        dataFactory.postProperty = function (plot) {
            return $http({
                method: 'POST',
                url: 'api/ApplyRegistraionController/postplot',
                data:plot
            })
        }

        return dataFactory;
    }]);