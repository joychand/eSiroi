﻿(function () {
    'use strict';

    angular
        .module('eRegApp')
        .factory('deptModalService', ['$http', deptModalService]);

    function deptModalService($http) {
        var executantList = [1, 2, 3, 4, 5];
        var model = {
            // executant Model
            executant: {
                slNo: '',
                execLastName: '',
                execMiddleName: '',
                execSurName: '',
                alias:'',
                Aadhaar:'',
                fatherSurName: '',
                fatherMiddleName: '',
                fatherLastName: '',
                sex: '',
                occupation: '',
                state: '',
                district: '',
                subdivision: '',
                village: '',
                postoffice: '',
                pinCode: '',
                policestation: ''
            },
            // scope for executant dropdownlist
            execddl: {
                state:{},
                district: {},
                subdiv: {},
                village: {},
                policestation: {}, 
            },
            
            getlist: function() {
                return executantList;
            }
    

        }
        return model;
        }

    
})();