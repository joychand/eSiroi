
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
    //'use strict';

    angular
        .module('eRegApp')
        .controller('dataEntryformController', ['$scope', '$state', 'dept_sessionfactory', 'dataFactory', 'dept_dataFactory', 'deptModalService', 'modalService', dataEntryformController]);

    function dataEntryformController($scope, $state, dept_sessionfactory, dataFactory, dept_dataFactory, deptModalService, modalService) {
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
        $scope.loadDone = false;
        $scope.online = {};
        $scope.session = {};
        $scope.onlinedata = 'onlinecancel';
        angular.extend($scope.session, {
            exFormIsOnline: false,
            clFormIsOnline: false,
            idFormIsOnline: false,
            OnlineStatus: 'offline',
            slnoddlVisibility: false,
            exFormFirstVisit: true,
            clFormFistVisit: true,
            idFormFirstVisit: true
        })

        $scope.exeslnolist = [];
        $scope.claimslnolist = [];
        $scope.identslnolist = [];

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

           

           // }
       
        //*****  function call to inject dropdownlist data from dataFactory *****//  

        function getStates() {
            dataFactory.getStates().then(function (states) {
                $scope.states = states;
                console.log('getStates' + $scope.states[21].stateName);
                $scope.loadDone = true;
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
            $scope.onlinedata = 'getonline';
            $scope.visibility = false;
            $scope.click = true;
        }
        $scope.cancel = function () {
            $scope.visibility = true;
            $scope.click = false;
        }
        //get Online Data click
        $scope.onlineData = function () {
            
            dept_dataFactory.getOnlineExecutantList($scope.online.ackno).then(function (response) {
               
                dept_sessionfactory.updateOnlineExecModal(response.data);
               
                // get Online execddllist
                dept_dataFactory.getOnlineExecddlist($scope.online.ackno).then(function (response) {
                    dept_sessionfactory.updateOnlineExecddllModal(response.data);
                    // get Online ClaimantList
                    dept_dataFactory.getOnlineClaimantlist($scope.online.ackno).then(function (response) {
                        //update claimantlist modal session
                        dept_sessionfactory.updateOnlineClaimModal(response.data);
                        
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
                                //get Online Property Details


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
                    $scope.session.slnoddlVisibility = true; // flag used to display slno ddlist
                    $scope.session.OnlineStatus = 'online'; // Online status flag to toggle ddl online and offline
                    $scope.session.exFormIsOnline = true;   // ***********************************************
                    $scope.session.clFormIsOnline = true;  //   flag to populate online data to forms fields
                    $scope.session.idFormIsOnline = true;  // ************************************************
                }, function (result) {
                    console.log('getOnlineExecddlist fails' + result);
                });
                }, function (result) {
                console.log('getOnlineExecutantList fails ' + result)
               });
            $state.go('department.content.form');

        }

        // cancel online data click
        $scope.cancel = function () {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Ok',
                headerText: 'WARNING',
                bodyText: 'Are you sure you want to cancel online data entry?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                $scope.session.exFormIsOnline = false,
               $scope.session.clFormIsOnline = false,
               $scope.session.idFormIsOnline = false,
               $scope.session.OnlineStatus = 'offline',
                $scope.session.slnoddlVisibility = false,
                $scope.session.exFormFirstVisit = true,
                $scope.session.clFormFistVisit = true,
                $scope.session.idFormFirstVisit = true
                dept_sessionfactory.clearModelList();
                deptModalService.modelClear();
                $scope.exeslnolist = [];
                $scope.claimslnolist = [];
                $scope.identslnolist = [];
                //deptModalService.claimant = {};
                //deptModalService.claim = {};
                //console.log('Pristine' + $scope.deptRegform.execform.$pristine);
                $scope.onlinedata = 'onlinecancel';
                //$scope.deptRegform.execform.$setPristine();
                $state.go('department.content.form');
            });
           
           
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
       
       
        $scope.PlotDetails = [];
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
        .controller('deptExeController', ['$scope', '$state', 'dataFactory', 'online', 'dept_sessionfactory', 'deptModalService', 'dept_dataFactory','$timeout', deptExeController]);

    function deptExeController($scope, $state, dataFactory, online, dept_sessionfactory, deptModalService, dept_dataFactory, $timeout) {

        $scope.online = online;
        $scope.executant = {};
        $scope.execddl = {};
        $scope.executantlist = [];
        $scope.execddlist = [];
        $scope.Elist = {}
        $scope.exForm = {};
        $scope.exForm.currSlno = 0;
      
        console.log($scope.session.OnlineStatus);
        
          
       
       
        // ***To get online data ***
        $scope.executantlist = angular.copy(dept_sessionfactory.getOnlineExecModallist());
        $scope.execddlist = angular.copy(dept_sessionfactory.getOnlineExecddlModallist());
        if ($scope.session.exFormIsOnline) {
           
           
            
              
                //  *** To be done *** Get Online Executantlist for first time
               
                for (var i = 0; i < $scope.executantlist.length; i++) {
                    
                    $scope.exeslnolist.push($scope.executantlist[i].slNo);
                }
               
                deptModalService.executant = $scope.executantlist[0];
                deptModalService.execddl = $scope.execddlist[0];
                // update the online status
                $scope.session.exFormIsOnline = false;

            }
            

        // Injecting executant from Modal Service
            $scope.executant = deptModalService.executant;             
            $scope.execddl = deptModalService.execddl;
        // Set default values of the form fields
          
            if (!$scope.session.exFormIsonline && $scope.session.exFormFirstVisit)
            {
               
                $scope.execddl.state = $scope.states[21];
                $scope.executant.slNo = $scope.exForm.currSlno + 1;
                $scope.exForm.currSlno = $scope.executant.slNo;
                $scope.session.exFormFirstVisit = false;
                //
            }
           
            
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
                angular.extend($scope.executant, {
                    tsno: $scope.tsyear.ts,
                    tsyear: $scope.tsyear.tyear,
                    state: $scope.execddl.state.stateName,
                    district: $scope.execddl.district.distName,
                    subDivison: $scope.execddl.subDivision.subDivName,
                    village: $scope.execddl.village.villName,
                    postOffice: $scope.execddl.postOffice.postOffice1,
                    pinCode: $scope.execddl.postOffice.pinCode,
                    enterby: 'radha' 
                });

                
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
        $scope.Clist = {}
        $scope.claimsession = {};
        $scope.clForm = {};
        $scope.clForm.currSlno = 0;

        // console.log(deptModalService.claimant);
        $scope.claimantlist = dept_sessionfactory.getOnlineClaimModallist();
        $scope.claimddlist = dept_sessionfactory.getOnlineCalimddlModal();
        console.log($scope.session.clFormIsOnline);
        if ($scope.session.clFormIsOnline)
        {
            //get claimantlist for online data
            
            for (var i = 0; i < $scope.claimantlist.length; i++) {

                $scope.claimslnolist.push($scope.claimantlist[i].slNo);
            }
            
            deptModalService.claimant = $scope.claimantlist[0];
            deptModalService.claim = $scope.claimddlist[0];
            $scope.session.clFormIsOnline = false;
            
        }
        $scope.claimant = deptModalService.claimant;
       $scope.claim = deptModalService.claim;
     
        // inject default value of forms fields
       if (!$scope.session.clFormIsOnline && $scope.session.clFormFistVisit)
       {
           $scope.claim.state = $scope.states[21];
           $scope.claimant.slNo = $scope.clForm.currSlno + 1;
           $scope.clForm.currSlno = $scope.claimant.slNo;
           $scope.session.clFormFistVisit = false;
           
       }

        // Claimant Online Slno change function
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
        $scope.idForm = {};
        $scope.idForm.currSlno = 0;
        $scope.ddlview = deptModalService.idFormOnline.ddlview;

        $scope.identifierlist = dept_sessionfactory.getOnlineIdentModallist();
        $scope.identddlist = dept_sessionfactory.getOnlineIdentModallist();
        if ( $scope.session.idFormIsOnline) {
            //get claimantlist for online data
           
            for (var i = 0; i < $scope.identifierlist.length; i++) {

                $scope.identslnolist.push($scope.identifierlist[i].slNo);
            }

            deptModalService.identifier = $scope.identifierlist[0];
            deptModalService.ident = $scope.identddlist[0];
            $scope.session.idFormIsOnline = false;
           
        }
        $scope.identifier = deptModalService.identifier;
        $scope.ident = deptModalService.ident;

        // inject default value
        if (!$scope.session.idFormIsOnline && $scope.session.idFormFirstVisit)
        {
            $scope.identifier.slNo = $scope.idForm.currSlno + 1;
            $scope.idForm.currSlno = $scope.identifier.slNo;
            $scope.ident.state = $scope.states[21];
        }

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

