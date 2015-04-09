
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

//***********APPLY REGISTRATION CONTROLLER***********************//
(function () {
    angular.module('eRegApp')
    .controller('applyRegistrationController', ['$scope', '$state', 'dataFactory', '$rootScope', 'sessionFactory', '$timeout', 'errors', 'ApplyRegModel', 'modalService', function ($scope, $state, dataFactory, $rootScope, sessionFactory, $timeout, errors, ApplyRegModel) {
        $scope.transactions = {};
       
        
        $scope.onlineapplication = {};
       
        $scope.sro = {};
        $scope.loginVisibility = 'clickLogin';
        $scope.applylogin={}
        init();
        function init() {
            $scope.loading = true;
            getMajortransaction();
            getsro();


        }

        function getsro() {
            dataFactory.getSRO().then(function (response) {
                $scope.sro = response.data;
            })
        }

        function getMajortransaction() {
            dataFactory.getMajortransaction().then(function (response) {
                $scope.transactions = response.data;
            },
            function (result) { })
            .finally(function () {
                $scope.loading = false;
            });

        }

        function sessionTransName(tran_Name) {
            sessionFactory.putTransName(tran_Name)
        }

        function getsession() {
            $scope.data = sessionFactory.getData();


        }

        $scope.next = function () {
            //try {
                ApplyRegModel.onlineapplication = $scope.onlineapplication;
                dataFactory.getSroName(ApplyRegModel.onlineapplication.sro).then(function (sroName) {
                    ApplyRegModel.sroName = sroName[0];
                   

                    dataFactory.getTransName(ApplyRegModel.onlineapplication.trans_maj_code).then(function (transName) {
                        ApplyRegModel.transName = transName[0];
                        $state.go('registration.content.forms.propertydetails');
                    })
                   
                })
               
               

            //}
            //catch (error) {
            //    console.log("error " + error);
            //}
        }

        $scope.clearform = function () {
            $scope.onlineapplication = {}
            $scope.confmpasswd = '';
            $scope.regapplyform.$setPristine();
        }

        //function submit() {
           
            // var online = sessionFactory.popApplicaton();
            //console.log(online.ackno);
            //dataFactory.postonlineapplication($scope.onlineapplication)
            //    .then(function (success) {

            //        sessionTransName($scope.transaction.tran_name);
            //        sessionFactory.putSro($scope.transaction.sro)
            //        //throw "oh no something failed";
            //         $rootScope.transName = $scope.transaction.tran_name;
            //        $rootScope.transName = success.data
            //        $scope.state = $state;
            //        $state.go('registration.content.forms.propertydetails');

            //    },function(error){console.log('post FactoryError'+ error)})
            //    .catch(function (error) {
            //        console.log('post catch all error  ' + error);
            //    });



        //}
        $scope.login = function () {
            $scope.loginVisibility = 'Login';
            $scope.click = true;
            //$scope.state = $state;
            //$state.go('registration.content.apply.login')
        }

        $scope.loginCancel = function () {
            $scope.loginVisibility = 'clickLogin';
            $scope.applylogin = {};

        }

        function getackno(sro) {
            // $scope.ackno = 0;
            sessionFactory.getAckno(sro).then(function (result) {
                //console.log(result.data[0].ackno);
                $scope.currAckno = result.data;
                // console.log($scope.currAckno[0].ackno);
                if ($scope.currAckno) {
                    if ($scope.currAckno[0].ackno == 1) {
                        $scope.ackno.value = 2;
                    }
                }

                else {
                    $scope.ackno.value = 1;
                }
                // $scope.ackno.value= $scope.currAckno[0].ackno;
            },
              function (error) {
                  console.log('getackno error: ' + error);
                  $scope.ackno.value = 1;

              })
              .catch(function (error) { console.log('catch error ' + error) });

          

        }

    }]);
})();


// ****** REGISTRATION APPLY FORMS CONTROLLER ******************//
(function () {
    
    var registrationController = function registrationController($scope, $state, dataFactory, $location, $rootScope, sessionFactory, ModalService, $modal, $log, ApplyRegModel, dept_dataFactory, modalService) {
        $scope.title = 'registrationController';
        //****** COMMON VARIABLES ********//
        $scope.districts = {};
        $scope.subdivisions = {};
        $scope.revsubdivisions = {};
        $scope.states = {};
        $scope.villages = {};
        $scope.RevVillages = {}
        $scope.postoffices = {};
        $scope.policestations = {};
        $scope.occupations = [];
        $scope.landclass = {};
        $scope.landtype = {};
        $scope.unit = [
            {
                unitcode: "H",
                unitName: "Hectare"

            },
            {
                unitcode: "A",
                unitName: "Acre"
            },

            {
                unitcode: "S",
                unitName: "Sq Feet"
            }
    ]

       
        $scope.regForm = {};


        angular.extend($scope.regForm, {
            transname: ApplyRegModel.transName,
            sroName: ApplyRegModel.sroName

        })

        //***** PROPERTYFORM VARIABLES********//
        $scope.propertyObject = {};
        $scope.property = {};
        $scope.propertyddl = {};
        $scope.property.unit = $scope.unit[0].unitcode;
        $scope.prpertyList = [];
        $scope.pformModel ={}
        angular.extend($scope.pformModel, {
            submitted: false
        })
        //**** EXECUTANTFORM VARIABLES
        $scope.executant = {};
        $scope.exec = {};
        $scope.executantList = [];
        $scope.eformModel = {};
        $scope.execSlno = 1;
        //**** CLAIMANTFORM VARIABLES *****//
        $scope.claimant = {}
        $scope.claim = {};
        $scope.claimantList = [];
        $scope.claimantObject = {};
        $scope.claimSlno = 1;
        $scope.cformModel = {};
       //*****IDENTIFIERFORM VARIABLES *****//
        $scope.identifier = {}
        $scope.ident = {};
        $scope.identifierList = [];
        $scope.ident.slno = 1;
        $scope.iformModel = {};
        $scope.pinCode = '';
        $scope.tempExecutant = {};
        $scope.claimant.slno = 1;
        $scope.ident.slno = 1;
        $scope.identSlno = 1;
        $scope.success = false;
        
       
      
        
        // 
        //$scope.postoffice = {};
       
        //console.log($scope.regForm.sroName);
        $scope.circles = {}
        
        $scope.trans = {};
       
        
       
        
       
        $scope.postoffice = {};
        $scope.aa = {};
       
        $scope.district = {};
        $scope.subdiv = {};
        $scope.village = {};
       
       
        $scope.readonly = false;
        //$scope.transName = {}
        
       
        
        init();

       

        function init() {
           


            //property details
            getDistricts();
            getRevSubdivions();
            getCircles()
            getRevVillages()
            //getTransName()
            //getSro()
          
           
            //party details
           
            getSubDivisions();
            getStates();
            getPoliceStations();
            getPostOffices();
            getVillages();
            $scope.occupations = ['Govt. employee', 'Business', 'Unemployed', 'Others'];
            getLandtype();
            getLandclass();
           
            //$scope.ident.slno = $scope.identSlno;
            
        }


      

        //function getSro() {
        //    $scope.sro = sessionFactory.getSro();
        //}
        //function getTransName() {
        //    $scope.trans.transname = sessionFactory.getTransName();
           
        //}

        //function getAckno() {
        //    $scope.trans.currAckno = sessionFactory.getAckno();
        //}
        function getStates() {
            dataFactory.getStates().then(function (states) {
                $scope.states = states;
                $scope.state = $scope.states[21];
            });

        }
        function getDistricts() {
            dataFactory.getDistricts().then(function (districts) {
                $scope.districts = districts;
            });
        }
        function getRevSubdivions() {
            dataFactory.getRevSubDivisions().then(function (revsubdiv) {
                $scope.revsubdivisions = revsubdiv;
            })
        }
        function getSubDivisions() {
            dataFactory.getSubDivisions().then(function (subdivisions) {
                $scope.subdivisions = subdivisions;
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

        function getLandtype() {
            dept_dataFactory.getLandType().then(function (response) {
                $scope.landtype = response.data;
            })
        }

        function getLandclass() {
            dept_dataFactory.getLandClass().then(function (response) {
                $scope.landclass = response.data;
            })
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


        //***** PROPERTY FORM SUBMIT********//
        $scope.nextparty = function () {
           
            $scope.propertyObject.Ackno = '1';
            $scope.property.state = 'Manipur'
            $scope.property.district = $scope.propertyddl.district.distName;
            $scope.property.subdivision = $scope.propertyddl.subdivsion.subDivName;
            $scope.property.Circle = $scope.propertyddl.circle.circleName;
            $scope.property.Village = $scope.propertyddl.village.villName;
           
           

           
            //sessionFactory.pushProperty($scope.propertyObject);
            //var propertyData = sessionFactory.getProperty();
            //console.log(propertyData[0].district);
            dataFactory.postProperty($scope.property)
                .then(function (response) {
                    sessionFactory.putCurrAckno(response.data);
                    $scope.trans.currAckno = response.data;
                    

                    $scope.pformModel.submitted = true;
                    ApplyRegModel.onlineapplication.ackno = response.data;
                    ApplyRegModel.onlineapplication.year = '2015';
                    ApplyRegModel.onlineapplication.date = '';
                    ApplyRegModel.onlineapplication.status = 'incomplete';
                    console.log(ApplyRegModel.onlineapplication);
                    dataFactory.postonlineapplication(ApplyRegModel.onlineapplication).then(function (reponse) {
                        $state.go('registration.content.forms.executant');
                    })
                   
                })
              
            
        }

        
        
        //executant submit
        $scope.onexsubmit = function () {
            //console.log($scope.pformModel.submitted);
            createExecutantObject();
           
            //$scope.$$childTail.execform.$setPristine();
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

        // create Identifier object
        var createIdentifierObject = function () {
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

        $scope.items = ['item1', 'item2', 'item3'];
        
        //submit the Registration forms
        $scope.formsubmit = function () {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'submit',
                headerText: 'Confirmation',
                bodyText: 'Do you want to submit the application ?'
            };
            modalService.showModal({}, modalOptions).then(function (result) {
                createIdentifierObject();
                postpartydetail();


                //    //$scope.mod = {};
                //    $scope.modalInstance = {};
                //    $scope.modalInstance = $modal.open({
                //        templateUrl: 'Home/modal',
                //        controller: 'ModalInstanceCtrl',
                //        //scope: $scope,
                //        backdrop: 'static',
                //        //size: size,
                //        resolve: {
                //            ackno: function () {
                //                return sessionFactory.getCurrAckno();
                //            }
                //        }
                //});


                //$scope.modalInstance.result.then(function (result) {
                //    //alert('ok');
                //    //$scope.selected = selectedItem;
                //    $state.go('department.content.home');
                //}, function () {
                //    $log.info('Modal dismissed at: ' + new Date());
                //    console.log('cancel pressed');
                //});

            });

        }
   
        function postpartydetail () {
            dataFactory.postexecutant(sessionFactory.getExecutantList())
                      .then(function (response) {
                          console.log('ExecutantList inserted');
                          dataFactory.postclaimant(sessionFactory.getClaimantList())
                              .then(function (response) {
                                  console.log('claimantList inserted');
                                  dataFactory.postidentifier(sessionFactory.getIdentifierList())
                                  .then(function (response) {
                                      console.log('idetifierlist inserted');

                                      // DISPLAY CONFIRMATION MODAL
                                      var modalOptions = {
                                          closeButtonText: 'Cancel',
                                          actionButtonText: 'Ok',
                                          headerText: 'Application Successfully submitted',
                                          bodyText: 'Your Acknowledgement No. is: ',
                                          customData:  sessionFactory.getCurrAckno()
                                      };
                                      modalService.showModal({}, modalOptions).then(function (result) {
                                          console.log('dfsdfds' + sessionFactory.getCurrAckno)
                                          $state.go('registration.content.applyregsuccess');
                                      })

                                  });
                              });
                      });

        }

}


    registrationController.$inject = ['$scope', '$state', 'dataFactory', '$location', '$rootScope', 'sessionFactory', 'ModalService', '$modal', '$log', 'ApplyRegModel', 'dept_dataFactory', 'modalService'];
    angular
       .module('eRegApp')
       .controller('registrationController', registrationController);

}());


