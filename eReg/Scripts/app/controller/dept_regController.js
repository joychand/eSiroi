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
            $scope.OnlineStatus = 'offline';
         

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
                $scope.OnlineStatus = 'online';
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
       


      
    }
})();

// **dept_dataEntry_form_executant controller** //

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptExeController', ['$scope', '$state', 'dataFactory', 'online', 'dept_sessionfactory', 'deptModalService', 'dept_dataFactory', deptExeController]);

    function deptExeController($scope, $state, dataFactory, online, dept_sessionfactory, deptModalService, dept_dataFactory) {

        $scope.online = online;
        $scope.executant = {};
        $scope.execddl = {};
        $scope.executantlist = [];
        $scope.execddlist = [];
        $scope.Elist = {}
        $scope.session = {};
        
        
       
        //console.log($scope.execddlist);
        //console.log(executantlist);
        $scope.session.isonline = dept_sessionfactory.getExecOnline();
        $scope.executantlist = dept_sessionfactory.getOnlineExecModallist();
        $scope.execddlist = dept_sessionfactory.getOnlineExecddlModallist();
        // ***To get online data ***
        if ($scope.online === true) {
            if ($scope.session.isonline) {

               // $scope.exeslnolist = [];
              
                //  *** To be done *** Get Online Executantlist for first time
               
                for (var i = 0; i < $scope.executantlist.length; i++) {
                    
                    $scope.exeslnolist.push($scope.executantlist[i].slNo);
                }
               
                deptModalService.executant = $scope.executantlist[0];
                deptModalService.execddl = $scope.execddlist[0];
                // update the online status
                dept_sessionfactory.updateExecOnline();

            }
        }
        //console.log($scope.exeslnolist);

        // Injecting executant from Modal Service
        $scope.executant = deptModalService.executant;
        
        
            $scope.execddl = deptModalService.execddl;

            //else {
        //    $scope.execddl = deptModalService.execOfflineddl;
        //}
        
        //console.log($scope.execddl.state);
       
       // initialize dropdownlist       
        init();
        function init() {
            $scope.success = false;
            
            
        }

            
        //******* ONLINE SELECT EXECUTANT LIST **********/
        $scope.getselectedExecutant = function () {
            //console.log($scope.Elist.slNo);
           
            var currSlno = $scope.Elist.slNo;
            deptModalService.executant = $scope.executantlist[currSlno - 1];
            deptModalService.execddl = $scope.execddlist[currSlno - 1];
            $scope.executant = deptModalService.executant;
            $scope.execddl = deptModalService.execddl;
           
        }

        //***** exsubmit() button *********//
        $scope.onexsubmit = function () {

            if ($scope.OnlineStatus === 'offline') {

                $scope.executant.tsno = $scope.tsyear.ts;
                $scope.executant.tsyear = $scope.tsyear.tyear;
                $scope.executant.state = $scope.execddl.state.stateName;
                $scope.executant.district = $scope.execddl.district.distName;
                $scope.executant.subDivison = $scope.execddl.subDivison.subDivName;
                $scope.executant.village = $scope.execddl.village.villName;
                $scope.executant.postOffice = $scope.execddl.postOffice.postOffice1;
                $scope.executant.pinCode = $scope.execddl.postOffice.pinCode;
                $scope.executant.enterby = 'radha'
                dept_sessionfactory.pushExecutant($scope.executant);

                              
            }
            else {
                for (var i = 0; i < $scope.executantlist.length; i++) {

                    $scope.executantlist[i].tsno = $scope.tsyear.ts;
                    $scope.executantlist[i].tsyear = $scope.tsyear.tyear;
                    $scope.executantlist[i].enterby = 'radha';
                }

                dept_sessionfactory.putOnlineExecutantlist($scope.executantlist)
            }
            
            //dept_dataFactory.postdeptexecutantlist($scope.executantlist).then(function (response) {
            //    console.log('registration successfully data entered');
            //}, function (result) {
            //    console.log('registration fails');
            //})

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
        .controller('deptIdentController', ['$scope', '$state','dept_sessionfactory', 'deptModalService', 'dept_dataFactory', deptIdentController]);

    function deptIdentController($scope, $state,dept_sessionfactory, deptModalService, dept_dataFactory) {
        $scope.ident = {};

        $scope.online = $scope.states[21];
        $scope.formsubmit = function () {
            dept_dataFactory.postdeptexecutantlist(dept_sessionfactory.getExecutantlist()).then(function (response) {
                console.log('registration successfully data entered');
            }, function (result) {
                console.log('registration fails');
            })
        }
        $scope.displayModal=function(){
            console.log('identifier district modal' + $scope.ident.district.distName)
        }
       
    }
})();

