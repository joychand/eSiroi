
/// <reference path = ~/scripts/angular.js />
/// <reference path = ~/scripts/app/factory/datafactory.js>
/// <reference path = ~/scripts/app/app.js>
'use strict';
angular
.module('eRegApp')
    .controller('ModalInstanceCtrl', ['$state','$scope', '$modalInstance','ackno',
    function ($state,$scope, $modalInstance, ackno) {
        $scope.mod = {};
        $scope.ackno = ackno;
        //console.log($scope.modalInstance);
        //$scope.items = items;
        //$scope.selected = {
        //    item: $scope.items[0]
        //};

        $scope.mod.ok = function () {
            //console.log('hello');
            //alert('okctrl');
            $modalInstance.close('dfd');
            
        };

        $scope.mod.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);

(function () {
    
    var registrationController = function registrationController($scope, $state, dataFactory, $location, $rootScope, sessionFactory, ModalService, $modal, $log) {
        $scope.title = 'registrationController';
        $scope.propertyObject = {};
        $scope.identifier = {}
        $scope.claimant ={}
        $scope.executant = {};
        $scope.exec = {};
        $scope.districts = [];
        $scope.subdivisions = [];
        $scope.states = [];
        $scope.villages = [];
        $scope.postoffices = [];
        $scope.policestations = [];
        $scope.pinCode = '';
        $scope.tempExecutant = {};
        $scope.occupations = [];
        $scope.success = false;
        $scope.claimSlno = 1;
        $scope.execSlno = 1;
        $scope.ident = {};
        // $scope.ident.slno = 1;
        //$scope.postoffice = {};
       
        
        $scope.circles = {}
        $scope.RevVillages = {}
        $scope.trans = {};
        $scope.prpertyList = [];
        $scope.executantList = [];
        $scope.claimantList = [];
        $scope.identifierList = [];
        $scope.property = {};
        $scope.postoffice = {};
        $scope.aa = {};
        $scope.claimantObject = {};
        $scope.district = {};
        $scope.subdiv = {};
        $scope.village = {};
        $scope.claim = {};
        $scope.ident = {};
        $scope.readonly = false;
        //$scope.transName = {}
        
       
        
        init();

       

        function init() {
           
            //property details
            getDistricts();
            getCircles()
            getRevVillages()
            getTransName()
            getSro()
           // $scope.loading = false;
           
            //party details
            getSubDivisions();
            getStates();
            getPoliceStations();
            getPostOffices();
            getVillages();
            $scope.occupations = ['Govt. employee', 'Business', 'Unemployed', 'Others'];
            $scope.claimant.slno = 1;
            $scope.ident.slno = 1;
            $scope.identSlno = 1;
            //$scope.ident.slno = $scope.identSlno;
            
        }


        //function showspinning() {
        //    $scope.loading = true;
        //}

        //function hidespinning() {
        //    $scope.loading = false;
        //}

        function getSro() {
            $scope.sro = sessionFactory.getSro();
        }
        function getTransName() {
            $scope.trans.transname = sessionFactory.getTransName();
           
        }

        function getAckno() {
            $scope.trans.currAckno = sessionFactory.getAckno();
        }
        function getDistricts() {
            dataFactory.getDistricts().then(function (districts) {
                $scope.districts = districts;
            });
        }
        function getCircles() {
            dataFactory.getCircle().then(function (Circles) {
                $scope.Circles = Circles;
            });
        }

        function getRevVillages() {
            dataFactory.getRevVillage().then(function (RevVillages) {
                $scope.RevVillages = RevVillages;
            });
        }

        //$scope.nextparty = function () {

        //    $scope.state = $state;
        //    $state.go('registration.content.forms.executant');
        //}

        function getSubDivisions() {
            dataFactory.getSubDivisions().then(function (subdivisions) {
                $scope.subdivisions = subdivisions;
            });
        }

        function getStates() {
            dataFactory.getStates().then(function (states) {
                $scope.states = states;
                $scope.state = $scope.states[21];
            });
            
        }

        function getVillages() {
            dataFactory.getVillages().then(function (villages) {
                $scope.villages = villages;
            });
        }

        function getPoliceStations() {
            dataFactory.getPoliceStations().then(function (policestations) {
                $scope.policestations = policestations;
            });
        }

        function getPostOffices() {
            dataFactory.getPostOffices().then(function (postoffices) {
                $scope.postoffices = postoffices;
            });
        }

       
        $scope.exec.clrpincode = function () {
            return $scope.postoffice.pinCode = '';
        };
    
        $scope.exec.onClickTab = function (tab) {
            $scope.exec.currentTab = tab.url;
        }

        $scope.exec.isActiveTab = function (tabUrl) {
            return tabUrl == $scope.exec.currentTab;
        }
        //propertysubmit 
        $scope.nextparty = function () {
            $scope.propertyObject.Ackno = '1';
            $scope.propertyObject.state='Manipur'
            $scope.propertyObject.district = $scope.property.district.distName;
            $scope.propertyObject.subdivision='lamphel'
            $scope.propertyObject.Circle = $scope.property.circle.circleCode;
            $scope.propertyObject.Village = 'village';
            //$scope.propertyObject.propertyarea = $scope.property.area;
            $scope.propertyObject.Dagno = $scope.property.plotno;
            $scope.propertyObject.pattano = $scope.property.pattano;
            $scope.propertyObject.TransactedArea = $scope.property.plotarea;
            //$scope.propertyObject.unit = $scope.property.unit;
            $scope.propertyObject.unit = 'H';
            $scope.propertyObject.landtype = '1';
            $scope.propertyObject.class = '1';

            $scope.propertyObject.address1 = $scope.property.address1;
            $scope.propertyObject.address2 = $scope.property.address2;
            $scope.propertyObject.address3 = $scope.property.address3;
            sessionFactory.pushProperty($scope.propertyObject);
            //var propertyData = sessionFactory.getProperty();
            //console.log(propertyData[0].district);
            dataFactory.postProperty($scope.propertyObject)
                .then(function (response) {
                    sessionFactory.putCurrAckno(response.data);
                    $scope.trans.currAckno = response.data;
                    console.log('currAckno='+ response.data)
                    $state.go('registration.content.forms.executant');
                }),
               function (result) {
                   console.log("plot submit fail" + result);
               }
            
            
        }

        
        
        //executant submit
        $scope.onexsubmit = function () {

            createExecutantObject();
           
            $scope.$$childTail.execform.$setPristine();
            $scope.executant = {};
            $scope.exec = {};
            $scope.aa = {};
            $scope.executant.slno = $scope.execSlno + 1;
            $scope.execSlno = $scope.executant.slno;
            $state.go('registration.content.forms.claimant')
            //$scope.readonly = true;
            //postexecutant($scope.executant);
        };

        // executant add more
        $scope.execAddmore = function () {
            createExecutantObject();
            $scope.$$childTail.execform.$setPristine();
            $scope.executant = {};
            $scope.exec = {};
            $scope.aa = {};
            $scope.executant.slno = $scope.execSlno + 1;
            $scope.execSlno = $scope.executant.slno;
        }
        //prepare executantObject
       var createExecutantObject = function () {
            $scope.executant.State = $scope.state.stateName;
            $scope.executant.District = $scope.exec.district.distName;
            $scope.executant.SubDivision = $scope.exec.subdiv.subDivName;
            $scope.executant.Village = $scope.exec.village.villName;
            $scope.executant.PostOffice = $scope.aa.postoffice.postOffice1;
            $scope.executant.Ackno = sessionFactory.getCurrAckno();
            $scope.executant.SlNo = $scope.execSlno;
            $scope.executant.Street = 'sdfd';
            $scope.executant.PoliceSt = 'lkdfjdlkfd';
            $scope.executant.EnterBy = 'dlkfjdlkf';
            $scope.executant.pinCode = $scope.aa.postoffice.pinCode;
            $scope.executant.occupation = 1;
            sessionFactory.pushExecutant($scope.executant);
        }

      
        // prepare claimant Model
        var createClaimantObject = function () {
            $scope.claimant.State = $scope.state.stateName;
            $scope.claimant.District = $scope.claim.district.distName;
            $scope.claimant.SubDivision = $scope.claim.subdiv.subDivName;
            $scope.claimant.Village = $scope.claim.village.villName;
            $scope.claimant.PostOffice = $scope.claim.postoffice.postOffice1;
            $scope.claimant.Ackno = sessionFactory.getCurrAckno();
            //$scope.claimant.SlNo = $scope.claimant.slno;
            $scope.claimant.Street = 'sdfd';
            $scope.claimant.PoliceSt = 'lkdfjdlkfd';
            $scope.claimant.EnterBy = 'dlkfjdlkf';
            $scope.claimant.pinCode = $scope.claim.postoffice.pinCode;
            $scope.claimant.occupation = 1;
            $scope.claimant.circle = 'Lamphel';
            sessionFactory.pushClaimant($scope.claimant);

        }
        //add more claimant
        $scope.claimantAddmore = function () {
            createClaimantObject();
            // flush $scope variable
            $scope.claimant = {};
            $scope.claim = {};
            $scope.claimant.slno = $scope.claimSlno + 1;
            $scope.claimSlno = $scope.claimant.slno;
        }

        //submit claimant
        $scope.onclaimantsubmit = function () {
            createClaimantObject();
            $state.go('registration.content.forms.identifier');
        }
        //addmore
        $scope.identAddmore = function () {
            console.log($scope.identSlno);
            createIdentifierObject();
           // sessionFactory.pushIdentifier($scope.identifier);
            //flush $scope
            $scope.identifier = {};
            $scope.ident = {};
            $scope.ident.slno = $scope.identSlno + 1;
            $scope.identSlno = $scope.ident.slno;

        }
        $scope.items = ['item1', 'item2', 'item3'];
        
        //submit the Registration forms
        $scope.formsubmit = function () {
            createIdentifierObject();
            dataFactory.postexecutant(sessionFactory.getExecutantList())
            .then(function (response) {
                console.log('ExecutantList inserted');
                dataFactory.postclaimant(sessionFactory.getClaimantList())
                .then(function (response) {
                    console.log('claimantList inserted');
                    console.log(sessionFactory.getIdentifierList());
                    dataFactory.postidentifier(sessionFactory.getIdentifierList())
                    .then(function (response) {
                        console.log('idetifierlist inserted' );

                    }, function (result) {
                        console.log('identifierlist insert fails' + result)

                    });

                }, function (result) {
                    console.log('claimantList insert fails' + result)
                });
            }, function (result) {
                console.log('executantlist insert fails' + result);
            });
            //$scope.mod = {};
            $scope.modalInstance = {};
            $scope.modalInstance = $modal.open({
                templateUrl: 'Home/modal',
                controller: 'ModalInstanceCtrl',
                //scope: $scope,
                backdrop: 'static',
                //size: size,
                resolve: {
                    ackno: function () {
                        return sessionFactory.getCurrAckno();
                    }
                }
        });
        

            $scope.modalInstance.result.then(function (result) {
                //alert('ok');
                //$scope.selected = selectedItem;
               $state.go('Home');
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                console.log('cancel pressed');
            });

            
       

      

    }
      

   
    // create Identifier object
   var createIdentifierObject= function()
    {
        $scope.identifier.State = $scope.state.stateName;
        $scope.identifier.District = $scope.ident.district.distName;
        $scope.identifier.SubDivision = $scope.ident.subdiv.subDivName;
        $scope.identifier.Village = $scope.ident.village.villName;
        $scope.identifier.PostOffice = $scope.ident.postoffice.postOffice1;
        $scope.identifier.Ackno = sessionFactory.getCurrAckno();
        $scope.identifier.slno = $scope.ident.slno;
        $scope.identifier.IdentSurName = $scope.ident.SurName
        $scope.identifier.IdentMiddleName = $scope.ident.MiddleName
        $scope.identifier.IdentLastName = $scope.ident.LastName
        $scope.identifier.Alias = $scope.ident.alias
        //$scope.identifier.Identify = 'Identify';
        $scope.identifier.Sex = $scope.ident.sex
        $scope.identifier.FatherSurName = $scope.ident.fatherSurname
        $scope.identifier.FatherMiddleName = $scope.ident.fatherMiddleName
        $scope.identifier.FatherLastName = $scope.ident.fatherLastName
        $scope.identifier.Street = 'sdfd';
        $scope.identifier.PoliceSt = 'lkdfjdlkfd';
        $scope.identifier.circle = 'Lamphel';
        //$scope.identifier.EnterBy = 'dlkfjdlkf';
        $scope.identifier.pinCode = $scope.ident.postoffice.pinCode;
        $scope.identifier.occupation = 1;
        sessionFactory.pushIdentifier($scope.identifier);
    }
       
}


    registrationController.$inject = ['$scope', '$state', 'dataFactory', '$location', '$rootScope', 'sessionFactory', 'ModalService','$modal','$log'];
    angular
       .module('eRegApp')
       .controller('registrationController', registrationController);

}());

//applyregistration controller

angular
.module('eRegApp')
    .controller('applyRegistrationController', ['$scope', 'dataFactory', '$location',
    function ($scope, dataFactory, $location) {

        $scope.hint = "home";
        //$scope.visibility = true;
        init();
        function init(){
            $scope.visibility=false;
        }
    }])

