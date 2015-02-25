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
        .controller('dataEntryformController', ['$scope', '$state', 'dept_sessionfactory','dataFactory', dataEntryformController]);

    function dataEntryformController($scope, $state, dept_sessionfactory, dataFactory) {
      
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

            // *** inject dropdownlist data **//
            getDistricts();
            getSubDivisions();
            getStates();
           // getPoliceStations();
            getPostOffices();
            getVillages();

           

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
       
        $scope.session = {};
        $scope.session.isonline = dept_sessionfactory.getExecOnline();
        if ($scope.online === true) {
            if ($scope.session.isonline) {
               // flush the executant modal
                deptModalService.executant = {};
                deptModalService.execddl = {};
                //  *** To be done *** Get Online Executantlist for first time
                

               // update the online status
                dept_sessionfactory.updateExecOnline();

            }
        }

        // Injecting executant from Modal Service
        $scope.executant = deptModalService.executant;
        $scope.execddl = deptModalService.execddl;
            
       // initialize dropdownlist       
        init();
        function init() {
            $scope.success = false;
            //$scope.executant = {};
            $scope.executant.Slno = 1;
            $scope.session.Slno = $scope.executant.Slno;
            //$scope.online = online;
            //getDistricts();
            //getSubDivisions();
            //getStates();
            //getPoliceStations();
            //getPostOffices();
            //getVillages();
            $scope.occupations = ['Govt. employee', 'Business', 'Unemployed', 'Others'];
        }

        
            
           
     //***** inject dropdownlist data from dataFactory *****//  

        //function getStates() {
        //    dataFactory.getStates().then(function (states) {
        //        $scope.states = states;
        //        $scope.execddl.state = $scope.states[21];
        //    });

        //}

        //function getDistricts() {
        //    dataFactory.getDistricts().then(function (districts) {
        //        $scope.districts = districts;
        //    });
        //}


        //function getSubDivisions() {
        //    dataFactory.getSubDivisions().then(function (subdivisions) {
        //        $scope.subdivisions = subdivisions;
        //    });
        //}
        //function getVillages() {
        //    dataFactory.getVillages().then(function (villages) {
        //        $scope.villages = villages;
        //    });
        //}
        //function getPoliceStations() {
        //    dataFactory.getPoliceStations().then(function (policestations) {
        //        $scope.policestations = policestations;
        //    });
        //}

        //function getPostOffices() {
        //    dataFactory.getPostOffices().then(function (postoffices) {
        //        $scope.postoffices = postoffices;
        //    });
        //}

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
       
    }
})();

