﻿(function () {
    'use strict';

    angular
        .module('eRegApp')
        .factory('dept_sessionfactory', ['$http', dept_sessionfactory]);

    function dept_sessionfactory($http) {
        var service = {};
        var linksVisibility;
        var Online = false;
        var execOnline = false;
        var sessionexecutantlist = [];
        var sessionexecddlist = [];

        service.getLinkVisibility = function () {
            return linkVisibilty;
        }

        service.dEntryOffVisible = function () {
            linksVisibility = false;
        }
        
        service.dEntryOnVisible = function () {
            linksVisibility = true;
        }

        service.getOnline=function(){

            return Online;


        }
        service.getExecOnline = function () {
            return execOnline;
        }

        service.putOnline = function () {
            Online = true;
            execOnline = true;
        }

        service.updateExecOnline = function () {
            execOnline = false;
        }
        
        service.updateOnlineExecModal = function (executantlist) {
            
            sessionexecutantlist = executantlist;
            //console.log('service' + sessionexecutantlist[0].ackno);
        }
        
        service.getOnlineExecModallist = function () {
           
            return sessionexecutantlist;
        }

        service.updateOnlineExecddllModal = function (execddlist) {
            sessionexecddlist = execddlist;
        }

        service.getOnlineExecddlModallist = function () {

            return sessionexecddlist;
        }

        return service;

        //function getData() { }
    }
})();