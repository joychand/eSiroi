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
        .controller('deptHomeController', ['$scope', '$rootScope', deptHomeController]);

    function deptHomeController($scope, $rootScope) {
        $scope.myData = [{ name: "Moroni", age: 50 },
                    { name: "Tiancum", age: 43 },
                    { name: "Jacob", age: 27 },
                    { name: "Nephi", age: 29 },
                    { name: "Enos", age: 34 }];
        $scope.gridOptions = { data: 'myData' };

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
        .controller('dataEntryformController', ['$scope', '$state', 'dept_sessionfactory', 'dataFactory', 'dept_dataFactory', 'deptModalService', dataEntryformController]);

    function dataEntryformController($scope, $state, dept_sessionfactory, dataFactory, dept_dataFactory, deptModalService) {
      
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
            $scope.claimslnolist = [];
            $scope.identslnolist = [];
            $scope.OnlineStatus = 'offline';
            deptModalService.idFormOnline.ddlview = 'offline';
         

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
                
                // get Online execddllist
                dept_dataFactory.getOnlineExecddlist($scope.online.ackno).then(function (response) {
                    dept_sessionfactory.updateOnlineExecddllModal(response.data);
                    // get Online ClaimantList
                    dept_dataFactory.getOnlineClaimantlist($scope.online.ackno).then(function (response) {
                        //update claimantlist modal session
                        dept_sessionfactory.updateOnlineClaimModal(response.data);
                        deptModalService.clFormOnline.status = true;
                        deptModalService.clFormOnline.slnoddlVisibility = true;
                        dept_dataFactory.getclaimddlist($scope.online.ackno).then(function (response) {
                            dept_sessionfactory.updateOnlineClaimddlModal(response.data);
                        // get Online Identifer list
                        dept_dataFactory.getOnlineIdentifierlist($scope.online.ackno).then(function (response) {
                            //update Identiferlist modal session
                            dept_sessionfactory.updateOnlineIdentModal(response.data);
                            deptModalService.idFormOnline.status = true;
                            deptModalService.idFormOnline.slnoddlVisibility = true;
                            deptModalService.idFormOnline.ddlview = 'online';
                            dept_dataFactory.getOnlineIdentddlist($scope.online.ackno).then(function (response) {
                                dept_sessionfactory.updateOnlineIdentddlModal(response.data);
                            }, function (result) {
                            console.log('getidentddlist fails' + result )});
                        },
                        //getOnlineIdentifierList erros
                        function(result){
                            console.log('get Identifer list errors: ' + result);
                        });
                        },
                        // getCaimantddlist errors
                        function (result) {
                            console.log('getClaimantddlist errors' + result);
                        });
                     }, 
                    // getclaimant errors
                    function(result){
                        cosole.log('get Claimant list errors:' + result);
                    });
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
            
          
        }

    }
})();  //  //***** End of deptExeController ****//



//dept_dataEntry_form_claimant Controller//

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptClaimController', ['$scope', '$state', 'dept_sessionfactory', 'deptModalService', 'dept_dataFactory',deptClaimController]);

    function deptClaimController($scope, $state, dept_sessionfactory, deptModalService, dept_dataFactory) {

        $scope.clOnlinestatus='false'
        $scope.claimant = {};
        $scope.claim = {};
        $scope.claimantlist = [];
        $scope.claimddlist = [];
        $scope.clist = {}
        $scope.claimsession = {};
        // console.log(deptModalService.claimant);
        $scope.claimantlist = dept_sessionfactory.getOnlineClaimModallist();
        $scope.claimddlist = dept_sessionfactory.getOnlineCalimddlModal();
        if (deptModalService.clFormOnline.status)
        {
            //get claimantlist for online data
            //$scope.claimantlist = dept_sessionfactory.getOnlineClaimModallist();
            for (var i = 0; i < $scope.claimantlist.length; i++) {

                $scope.claimslnolist.push($scope.claimantlist[i].slNo);
            }

            deptModalService.claimant = $scope.claimantlist[0];
            deptModalService.claim = $scope.claimddlist[0];
            deptModalService.clFormOnline.status = false;
            console.log('online');
        }
        $scope.claimant = deptModalService.claimant;
       $scope.claim = deptModalService.claim;

        $scope.getselectedClaimant = function () {
            var currSlno = $scope.Clist.slNo;
            deptModalService.claimant = $scope.claimantlist[currSlno - 1];
            deptModalService.claim = $scope.claimddlist[currSlno - 1];
            $scope.claimant = deptModalService.claimant;
           $scope.claim = deptModalService.claim;
        }

        
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
        $scope.identifier = {};
        $scope.identifierlist = [];
        $scope.identddlist = [];
        $scope.Ilist = {};
        $scope.ddlview = deptModalService.idFormOnline.ddlview;

        $scope.identifierlist = dept_sessionfactory.getOnlineIdentModallist();
        $scope.identddlist = dept_sessionfactory.getOnlineIdentModallist();
        if (deptModalService.idFormOnline.status) {
            //get claimantlist for online data
           
            for (var i = 0; i < $scope.identifierlist.length; i++) {

                $scope.identslnolist.push($scope.identifierlist[i].slNo);
            }

            deptModalService.identifier = $scope.identifierlist[0];
            deptModalService.ident = $scope.identddlist[0];
            deptModalService.idFormOnline.status = false;
            console.log('online');
        }
        $scope.identifier = deptModalService.identifier;
        $scope.ident = deptModalService.ident;
        $scope.getselectedIdentifier = function () {
            var currSlno = $scope.Ilist.slNo;
            deptModalService.identifier = $scope.identifierlist[currSlno - 1];
            deptModalService.ident = $scope.identddlist[currSlno - 1];
            $scope.identifier = deptModalService.identifier;
            $scope.ident = deptModalService.ident;
        }
        
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

