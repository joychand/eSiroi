﻿
//deptcontentController
(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptcontentController', ['$scope','$rootScope', deptcontentController]);

    function deptcontentController($scope,$rootScope) {
        console.log($rootScope.value);
        
    }
})();

//deptHomeController
(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptHomeController', ['$scope', '$rootScope', deptHomeController]);

    function deptHomeController($scope, $rootScope) {
        $scope.myData = [{ Ackno: "Moroni", date: 50 },
                    { Ackno: "Tiancum", date: 43 },
                    { Ackno: "Jacob", date: 27 },
                    { Ackno: "Nephi", date: 29 },
                    { Ackno: "Enos", date: 34 }];
        $scope.gridOptions = {
            data: 'myData',
            columnDefs: [{ field: 'Ackno', displayName: 'Ackno' }, { field: 'date', displayName: 'AppliedOn' }],
            jqueryUITheme: true
        };

    }
})();

//dept regController
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

//deptmenuController
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

//dept_loginController
(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptloginController', ['$scope', '$state','modalService',deptloginController]);

    function deptloginController($scope, $state, modalService) {
        $scope.login = {};
        //alert('haaaa');
        //var modalOptions = {
        //    closeButtonText: 'Cancel',
        //    actionButtonText: 'Login',
        //    headerText: 'Login',
        //    bodyText: ''
        //};

        //var modalDefault = {
        //    templateUrl: 'Home/loginPage',
        //    controller: 'loginMocalCtrl',
        //    backdrop: 'static'
        //};

        //modalService.showModal(modalDefault, modalOptions).then(function (result) {
        //    alert('login successful');
        //}, function (error) {
        //    alert('login Fail'); 
        //});

        
    }
    
})();

//LoginModalController
(function () {
    angular.module('eRegApp')
    .controller('loginModalCtrl', ['$scope', '$modalInstance', loginModalCtrl]);
    function loginModalCtrl($scope, $modalInstance) {
        $scope.login = {};
        // USER CLICK LOGIN EVENT
        $scope.login.login = function () {
            //TO DO GET USER CREDENTIALS VERIFY WITH THE BACKEND API

            $modalInstance.close();
        }

        // USER CLICK CANCEL EVENT
        $scope.login.cancel = function () {
            $modalInstance.dismiss();
        }
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
            $scope.revsubdivisions = {};
            $scope.villages = {};
            $scope.revvillages = {};
            $scope.postoffices = {};
            $scope.circles = {};
            $scope.landclass = {};
            $scope.landtype = {};
           // $scope.deed = {};
           // $scope.property = {};
            $scope.online = {};
           $scope.sess ={}
            $scope.sess.exFormIsOnline = false;
            $scope.sess.clFormIsOnline = false;
            $scope.sess.idFormIsOnline = false;
           
            $scope.slnoddlVisibility = false;
            $scope.exeslnolist = [];
            $scope.claimslnolist = [];
            $scope.identslnolist = [];
            $scope.OnlineStatus = 'offline';
            deptModalService.idFormOnline.ddlview = 'offline';
         

            // *** inject dropdownlist data **//
            getStates();
            getDistricts();
            getSubDivisions();
            getRevSubdivions();
            getCircles();
            getVillages();
            getRevVillages();
           // getPoliceStations();
            getPostOffices();
           
            getlandclass();
            getlandtype();
            $scope.occupations = ['Govt. employee', 'Business', 'Unemployed', 'Others'];
            $scope.unit = ['Hectare', 'Acre', 'SqFeet'];

           

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

        function getRevSubdivions() {
            dataFactory.getRevSubDivisions().then(function (revsubdiv) {
                $scope.revsubdivisions = revsubdiv;
            })
        }
        function getVillages() {
            dataFactory.getVillages().then(function (villages) {
                $scope.villages = villages;
            });
        }
        function getRevVillages() {
            dataFactory.getRevVillage().then(function (RevVillages) {
                $scope.revvillages = RevVillages;
            });
        }
        function getCircles() {
            dataFactory.getCircle().then(function (Circles) {
                $scope.Circles = Circles;
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

        function getlandclass() {
            dept_dataFactory.getLandClass().then(function (response) {
                $scope.landclass = response.data;
            })
        }
        function getlandtype() {
            dept_dataFactory.getLandType().then(function (response) {
                $scope.landtype = response.data;
            })
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
            
            dept_dataFactory.getOnlineExecutantList($scope.online.ackno).then(function (response) {
               
                $scope.sess.exFormIsOnline = true;
               // $scope.OnlineStatus = 'online;
                dept_sessionfactory.updateOnlineExecModal(response.data);
                $scope.slnoddlVisibility = true; // flag used to display slno ddlist
                $scope.OnlineStatus = 'online'; // Online status flag to toggle ddl online and offline
                
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
        .controller('deptPropController', ['$scope', '$state', 'district', '$http', '$modal', 'deptModalService', 'modalService',  deptPropController]);

    function deptPropController($scope, $state, district, $http, $modal, deptModalService, modalService) {
        
        $scope.property = {};
        $scope.propertyddl = {};
        $scope.property = deptModalService.property;
        $scope.propertyddl = deptModalService.propertyddl;
        //if (!$scope.poperty.firstVisit)
        //{
        //    $scope.property.unit = $scope.unit[0];
        //    $scope.property.firstVisit = true;
        //}
       
        $scope.PlotDetails = [];
       

       // $scope.BlankPlot = [];
        $scope.IsPlotFound = false;
        $scope.nextparty = function () {
            var modaloptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Ok',
                headerText: 'Confirmation',
                bodyText: 'Do you want to submit the property details'
            };
            modalService.showModal({}, modaloptions).then(function (result) {

            });
        }
        //VERIFY PLOT FUNCTION
        $scope.verfyplot = function () {

            $http({
                method: 'GET',
                url: 'api/deptRegistraionController/' + $scope.property.plotno + '/' + $scope.property.pattano + '/' + 'verfiyplot'
            }).then(function (response) {
                
                $scope.PlotDetails = response.data;
                $scope.IsPlotFound = true;
            }, function (result) {
                console.log('not found' + result);
                $scope.IsPlotFound = false;})
                .finally(function () {
                    console.log('finally');

                    

                    var modalOptions = {
                        closeButtonText: 'Cancel',
                        actionButtonText: 'Ok',
                        headerText: 'PlotDetails',
                        bodyText: ''
                    };

                    var modalDefault = {
                        templateUrl: 'Home/plotVerifyModal',
                            controller: 'PlotVerifyModalInstanceCtrl',
                            //scope: $scope,
                            backdrop: 'static',
                            //size: size,
                            resolve: {
                                IsPlotFound: function(){
                                    return $scope.IsPlotFound ;
                                },

                                plot: function () {
                                    return $scope.PlotDetails;
                                    //return (($scope.IsPlotFound)?$scope.PlotDetails:$scope.BlankPlot);
                                }
                            }

                    };
                   

                    modalService.showModal(modalDefault, modalOptions).then(function (result) {
                        alert('modalservice working');

                    });
                });
            
                       
        }

        


        $scope.saveproperty = function () {

            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Ok',
                headerText: 'Save Property Detaisl?',
                bodyText: 'Are you sure you want to save the propertyDetails?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {

            });
        }

        
    }
})();

// **** deptplotverify Modal Controller ******//
(function () {
    'use strict';
    angular
        .module('eRegApp')
        .controller('PlotVerifyModalInstanceCtrl', ['$scope', '$modalInstance', 'plot', 'IsPlotFound', '$modal',
            function ($scope, $modalInstance,plot,IsPlotFound ,$modal) {
                $scope.visibility = false;
                $scope.mod = {};
                if (IsPlotFound)
                {
                    $scope.visibility = true;
                $scope.plot1 = plot;
                    //console.log($scope.plot);

               
                $scope.gridOptions = { data: 'plot1' };
                }
                else
                {
                    $scope.message = 'Record not found';
                }
                $scope.mod.ok = function () {
                    $modalInstance.close();
                }

                $scope.mod.cancel = function () {
                    $modalInstance.dismiss();

                }
            }])

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
        
        
        console.log($scope.sess.exFormIsOnline);
       
        $scope.session.isonline = dept_sessionfactory.getExecOnline();
       
        // ***To get online data ***
        $scope.executantlist = angular.copy(dept_sessionfactory.getOnlineExecModallist());
        $scope.execddlist = angular.copy(dept_sessionfactory.getOnlineExecddlModallist());
        if ($scope.sess.exFormIsOnline) {
           
           
               // $scope.exeslnolist = [];
              
                //  *** To be done *** Get Online Executantlist for first time
               
                for (var i = 0; i < $scope.executantlist.length; i++) {
                    
                    $scope.exeslnolist.push($scope.executantlist[i].slNo);
                }
               
                deptModalService.executant = $scope.executantlist[0];
                deptModalService.execddl = $scope.execddlist[0];
                // update the online status
                $scope.sess.exFormIsOnline = false;

            }
       
        

        // Injecting executant from Modal Service
        $scope.executant = deptModalService.executant;
        
        
            $scope.execddl = deptModalService.execddl;

           
       
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
                $scope.executant = angular.extend($scope.execddl);

                //$scope.executant.tsno = $scope.tsyear.ts;
                //$scope.executant.tsyear = $scope.tsyear.tyear;
                //$scope.executant.state = $scope.execddl.state.stateName;
                //$scope.executant.district = $scope.execddl.district.distName;
                //$scope.executant.subDivison = $scope.execddl.subDivison.subDivName;
                //$scope.executant.village = $scope.execddl.village.villName;
                //$scope.executant.postOffice = $scope.execddl.postOffice.postOffice1;
                //$scope.executant.pinCode = $scope.execddl.postOffice.pinCode;
                //$scope.executant.enterby = 'radha'
                //dept_sessionfactory.pushExecutant($scope.executant);
                console.log($scope.executant);
                              
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
})();   //***** End of deptExeController ****//

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
            //console.log('online');
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

