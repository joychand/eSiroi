/// <reference path = ~/scripts/app/factory/dataFactory.js>
(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptcontentController', ['$scope','$rootScope', deptcontentController]);

    function deptcontentController($scope,$rootScope) {
        console.log($rootScope.value);
        
    }
})();
(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('dept_regController', ['$scope', '$state', 'majortrans', dept_regController]);

    function dept_regController($scope, $state, majortrans) {
        $scope.title = 'dept_regController';
        $scope.transactions = majortrans.data;
       //// $scope.links.dataSelected = false;
       // init();
       // function init() {
       //     getMajortransaction();
       // }
       // //get Major Transaction
       // function getMajortransaction() {
       //     dataFactory.getMajortransaction().then(function (transaction) {
       //         $scope.transactions = transaction;
       //     });

       // }
        $scope.proceed = function () {
            //console.log($scope.links.dataSelected);
            $state.go('department.content.form');
        }
      
    }
})();

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptmenuController', ['$scope', '$rootScope','$state', deptmenuController]);

    function deptmenuController($scope, $rootScope,$state) {
        $scope.$state = $state;
        //console.log($scope.$state.current.name);
       
    }
})();

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptloginController', ['$scope', '$state',deptloginController]);

    function deptloginController($scope, $state) {
        
     

        
    }
})();

// dept_dataEntry_from Controller //

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('dataEntryformController', ['$scope', '$state', 'dept_sessionfactory', 'dataFactory', 'dept_dataFactory', dataEntryformController]);

    function dataEntryformController($scope, $state, dept_sessionfactory, dataFactory, dept_dataFactory) {
      
        init();

        //initialize $scope properties

        function init() {
            $scope.tsyear = {};
            $scope.visibility = true;
            $scope.click = false;
            $scope.states = {};
            $scope.districts = {};
            $scope.subdivisions = {};
            $scope.villages = {};
            $scope.revvillages = {};
            $scope.postoffices = {};
            $scope.circles = {};
            $scope.online = {};
            $scope.slnoddlVisibility = true;
            $scope.exeslnolist = [];

            // *** inject dropdownlist data **//
            getDistricts();
            getSubDivisions();
            getStates();
           // getPoliceStations();
            getPostOffices();
            getVillages();
            $scope.occupations = ['Govt. employee', 'Business', 'Unemployed', 'Others'];

           

            }
       
        //*****  function call to inject dropdownlist data from dataFactory *****//  

        function getStates() {
            dataFactory.getStates().then(function (states) {
                $scope.states = states;
               // $scope.execddl.state = $scope.states[21];
            });

        }

        function getDistricts() {
            dataFactory.getDistricts().then(function (districts) {
                $scope.districts = districts;
            });
        }


        function getSubDivisions() {
            dataFactory.getSubDivisions().then(function (subdivisions) {
                $scope.subdivisions = subdivisions;
            });
        }
        function getVillages() {
            dataFactory.getVillages().then(function (villages) {
                $scope.villages = villages;
            });
        }
        //function getPoliceStations() {
        //    dataFactory.getPoliceStations().then(function (policestations) {
        //        $scope.policestations = policestations;
        //    });
        //}

        function getPostOffices() {
            dataFactory.getPostOffices().then(function (postoffices) {
                $scope.postoffices = postoffices;
            });
        }
      
        $scope.getOnline = function () {
            $scope.visibility = false;
            $scope.click = true;
        }
        $scope.cancel = function () {
            $scope.visibility = true;
            $scope.click = false;
        }
        $scope.onlineData = function () {
            dept_sessionfactory.putOnline();
            dept_dataFactory.getOnlineExecutantList($scope.online.ackno).then(function (response) {
                //console.log(response.data);
                dept_sessionfactory.updateOnlineExecModal(response.data);
                $scope.slnoddlVisibility = false;
                dept_dataFactory.getOnlineExecddlist($scope.online.ackno).then(function (response) {
                    dept_sessionfactory.updateOnlineExecddllModal(response.data);
                }, function (result) {
                    console.log('getOnlineExecddlist fails' + result);
                });

            }, function (result) {
                console.log('getOnlineExecutantList fails ' + result)
            });
            $state.go('department.content.form');

        }


       
    }
})();

//dept_dataEntry_form_property Controller //

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptPropController', ['$scope', '$state', 'district', deptPropController]);

    function deptPropController($scope, $state, district) {
        //$scope.districts = district;


      
    }
})();

// **dept_dataEntry_form_executant controller** //

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptExeController', ['$scope', '$state', 'dataFactory', 'online', 'dept_sessionfactory', 'deptModalService', deptExeController]);

    function deptExeController($scope, $state, dataFactory, online, dept_sessionfactory, deptModalService) {

        $scope.online = online;
        $scope.executant = {};
        $scope.execddl = {};
        $scope.executantlist = [];
        $scope.execddlist = [];
        $scope.Elist = {}
        $scope.session = {};
        
        $scope.executantlist = dept_sessionfactory.getOnlineExecModallist();
        $scope.execddlist = dept_sessionfactory.getOnlineExecddlModallist();
        console.log($scope.execddlist);
        //console.log(executantlist);
        $scope.session.isonline = dept_sessionfactory.getExecOnline();
        // ***To get online data ***
        if ($scope.online === true) {
            if ($scope.session.isonline) {
               // flush the service executant model
                //deptModalService.executant = {};
                //deptModalService.execddl = {};
                //  *** To be done *** Get Online Executantlist for first time
                
                for (var i = 0; i < $scope.executantlist.length; i++) {
                    
                    $scope.exeslnolist.push($scope.executantlist[i].slNo);
                }
                console.log($scope.exeslnolist);
                deptModalService.executant = $scope.executantlist[0];
                deptModalService.execddl = $scope.execddlist[0];
                // update the online status
                dept_sessionfactory.updateExecOnline();

            }
        }

        // Injecting executant from Modal Service
        $scope.executant = deptModalService.executant;
        $scope.execddl = deptModalService.execddl;
        console.log($scope.execddl.state);
       
       // initialize dropdownlist       
        init();
        function init() {
            $scope.success = false;
            
            
        }

        
            
           
    
        //$scope.execddl.clrpincode = function () {
           
        //}
       
        //******* ONLINE SELECT EXECUTANT LIST **********/
        $scope.getselectedExecutant = function () {
           
            var currSlno = $scope.Elist.slNo;
            deptModalService.executant = $scope.executantlist[currSlno - 1];
            deptModalService.execddl = $scope.execddlist[currSlno - 1];
            $scope.executant = deptModalService.executant;
            $scope.execddl = deptModalService.execddl;
           
        }

    }
})();  //  //***** End of deptExeController ****//



//dept_dataEntry_form_claimant Controller//

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptClaimController', ['$scope', '$state', deptClaimController]);

    function deptClaimController($scope, $state) {
        
    }
})();



//dept_dataEntry_form_Identifier Controller//

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptIdentController', ['$scope', '$state', deptIdentController]);

    function deptIdentController($scope, $state) {
        $scope.ident = {};

        $scope.online = $scope.states[21];
        console.log('hahaha' + $scope.online);
        $scope.displayModal=function(){
            console.log('identifier district modal' + $scope.ident.district.distName)
        }
       
    }
})();

