/// <reference path = ~/scripts/angular.js />
/// <reference path = ~/scripts/app/factory/datafactory.js>

/// <reference path = ~/scripts/angular-ui-router.js>
/// <reference path = ~/scripts/app/factory/sessionFactory.js>

var app = angular.module('eRegApp', ['ui.router', 'ct.ui.router.extras', 'angularModalService', 'ui.bootstrap']);
//var app1 = angular.module('eRegDeptApp', ['ngroute']);
//app.value = ('maj_code', '');
app.config(['$stateProvider', "$locationProvider", '$urlRouterProvider','$provide',function ($stateProvider, $locationProvider,$urlRouterProvider,$provide ) {
   
   
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('Home', {
            url: "/",
            templateUrl: 'Home/home'
            // controller:  "simpleController"
        })
         .state('login', {
             url: "/login",
             templateUrl: 'Home/login'
             //controller: "simpleController"
         })

        //DEPARTMENT ROUTING

         .state('department', {
             url: "/department",
             templateUrl: 'Home/department'
             //controller: 'simpleController'
         })

    .state('department.content',{
        abstract: true,
        controller: 'deptcontentController',
        views: {
            'sidemenu@department': {
                templateUrl: 'Home/deptsidemenu',
                controller: 'deptmenuController'
            },
            '@department':{
                    templateUrl: 'Home/departmentcontent'
            }
        }
    })

        .state('department.content.login',
        {
            url: '/login',
            views: {
                '@department.content':{
                    templateUrl: 'Home/login',
                    controller: 'deptloginController'
                }
                
            }
        })

        .state('department.content.home', {
            url: '/home',
            templateUrl: 'Home/dept_home'
        })
       
        .state('Search', {
            url: '/Search',
            templateUrl: 'Home/searchReg'
           
        })
        .state('department.content.data', {
            url: '/dataEntry',
            templateUrl: 'Home/dept_dataEntry',
            controller: 'dept_regController',
            resolve: {
                majortrans: function (dataFactory) {
                    return dataFactory.getMajortransaction();
                }
            }
        })

        .state('department.content.form', {
            
            url: '/dataEntryform',
            templateUrl: 'Home/dept_dataEntry_form',
            controller: 'dataEntryformController',
            
        })
           //.state('department.content.form.online', {
           //    url: '/getonline',
           //    views:{
           //        'online@department.content.form':{
           //            templateUrl: 'Home/deptOnlineData'
           //           // controller: ''
           //        }
           //    }
               
           //})
        .state('department.content.form.property', {
            url: '/dataEntryformProperty',
            templateUrl: 'Home/dept_dataEntry_form_property',
            controller: 'deptPropController',
            resolve:{
            district: function (dataFactory) {
                return dataFactory.getDistricts();

            }
            }
        })

        .state('department.content.form.executant', {
            url: '/dataEntryformexecutant',
            templateUrl: 'Home/dept_dataEntry_form_executant',
            controller: 'deptExeController',
            resolve: {
                online: function (dept_sessionfactory) {
                    return dept_sessionfactory.getOnline();
                }
            }
        })

         .state('department.content.form.claimant', {
             url: '/dataEntryformclaimant',
             templateUrl: 'Home/dept_dataEntry_form_claimant'
         })

        .state('department.content.form.identifier', {
            url: '/dataEntryformidentifier',
            templateUrl: 'Home/dept_dataEntry_form_identifier',
            controller: 'deptIdentController'
        })

        // APPLY REGISTRATION ROUTING

         .state('registration', {
             url: "/registration",
             templateUrl: 'Home/registration',
             deepStateRedirect: true
             //controller: function ($scope, $state) {
             //                                           $state.go('registration.content.apply');
             //                                       }
             
         })

        .state('registration.content',
        {
            abstract: true,
            controller: 'simpleController',
            views: {
                'sidemenu@registration': {
                    templateUrl: 'Home/regsidemenu'
                },
                '@registration':{
                    templateUrl:'Home/registrationcontent'

                    }

            },
            deepStateRedirect: true
             
        })
        .state('registration.content.apply', {
            url:'/apply',
            views: {

                '@registration.content': {
                    templateUrl: 'Home/applyregistration',
                    controller: 'simpleController2'
                }
            },
            //deepStateRedirect: true
            
        })
        .state('registration.content.apply.login', {
            url: '/login',
            
               
                    templateUrl: "Home/applyRegLogin"
                
            
        })
        
        .state('registration.content.forms', {
            url: '/forms',
            templateUrl: 'Home/registrationforms',
            controller:'registrationController',
            deepStateRedirect: true
        })
        .state('registration.content.forms.propertydetails', {
            url: '/propertydetails',
            templateUrl: 'Home/applyPropertyDetails'
            //controller: 'propertyController'
        })
        .state('registration.content.forms.executant', {
            url: '/executant',
            //template: '<h1>executant<h1>'
            templateUrl: 'Home/executant',
            //controller: 'registrationController',
           // resolve
            deepStateRedirect: true

        })
        .state('registration.content.forms.claimant', {
            url: '/claimant',
            templateUrl: "Home/claimant",
            deepStateRedirect: true
        })
        .state('registration.content.forms.identifier', {
            url:'/identifier',
            templateUrl: "Home/identifier",
            deepStateRedirect: true
        })
      
         
    //$locationProvider.html5Mode(true).hashPrefix("!");
    app.run(function ($rootScope, $state, $window, $timeout, $stateParams) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log('hahahahah');
            if (toState.resolve) {
                $rootScope.page.loading = true;
            }
        });

        $rootScope.addError = function (error) {
            $rootScope.message = error.message;
            $rootScope.reason = error.reason;
            $rootScope.page.loading = true;
            //$rootScope.values = 'jhgkjhkj';
        }
        $rootScope.$state = $state;
       
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess", function () {
            console.log('success');
            if (toState.resolve) {
                $rootScope.page.loading = false;
            }
            $timeout(function () {
                $window.ga('send', 'pageview', $window.location.pathname + $window.location.hash);
            });
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log('hahahahah');
            if (toState.resolve) {
                $rootScope.page.loading = true;
            }
        });
    });
    

    //$rootScope.$on("$routeChangeStart", function (event, next, current) {
    //    if (sessionStorage.restorestate == "true") {
    //        $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
    //        sessionStorage.restorestate = false;
    //    }
    //});

    ////let everthing know that we need to save state now.
    //window.onbeforeunload = function (event) {
    //    $rootScope.$broadcast('savestate');
    //};
    //});
}]);



app.controller('simpleController', ['$scope','$state', 'dataFactory', 'sessionFactory',
        function ($scope, $state, dataFactory,sessionFactory) {
            $scope.ack = 'kjkjhkjhk';
        }]);
app.controller('simpleController2', ['$scope', '$state', 'dataFactory', '$rootScope', 'sessionFactory','$timeout', 'errors',function ($scope, $state, dataFactory, $rootScope, sessionFactory, $timeout,errors) {
    $scope.transactions = {};
    $scope.visibility = true;
    $scope.click = false;
    $scope.data = '';
    $scope.onlineapplication = {};
    init();
    $scope.transaction = {};
    $scope.currAckno = [];
    $scope.ackno = [];
    function init() {
        $scope.loading = true;
        getMajortransaction();
        //getsession();

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
        submit();
    }
        //sessionFactory.getAckno($scope.transaction.sro)
        //    .then(function (result) {
        //        console.log(result.data[0].ackno);
        //        $scope.ackno.value = result.data[0].ackno + 1;
        //        console.log($scope.ackno.value);
        //    }, function (error) {
        //        $scope.ackno.value = 1;
        //    })
        //.catch(function (error) {
        //    console.log('catch error' + error)
        //})
        //.finally(function () { submit();})}
        
    //    getackno();
    //    //submit();
    //    $scope.$watch('ackno', function () {
    //        $timeout(function () { submit(); }, 2000);
    //    })
    //}
    $scope.clearform = function () {
        $scope.regapplyform.$setPristine();
    }
    function submit() {
       try {
        //console.log($scope.ackno)
        //$scope.onlineapplication.ackno = $scope.ackno.value;
        $scope.onlineapplication.year = '2014';
        $scope.onlineapplication.trans_maj_code = $scope.transaction.maj_code;
        //$scope.onlineapplication.name = $scope.transaction.name;
        //$scope.onlineapplication.address = $scope.transaction.address;
        $scope.onlineapplication.mobile = $scope.transaction.mobile;
        $scope.onlineapplication.aadhar = $scope.transaction.aadhar;
        $scope.onlineapplication.password = $scope.transaction.passwd;
        $scope.onlineapplication.sro = $scope.transaction.sro;
        sessionFactory.pushApplication($scope.onlineapplication);
        sessionTransName($scope.transaction.tran_name);
        sessionFactory.putSro($scope.transaction.sro);
        $state.go('registration.content.forms.propertydetails');
           
       } 
        catch (error){
            console.log("error " + error);
        }
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
       
        
      
    }
    $scope.login = function () {
        $scope.visibility = false;
        $scope.click = true;
        $scope.state = $state;
        $state.go('registration.content.apply.login')
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
            console.log('getackno error: '+ error);
            $scope.ackno.value = 1;

        })
        .catch(function (error) { console.log('catch error ' + error)});
     
      //$scope.$apply();
      //  console.log($scope.currAckno)
        //    var dataPromise=sessionFactory.getAckno(sro);

        //    ////     return ackno;
        //    ////console.log(response);
        //    //    $rootScope.ackno=response
        //    ////    //console.log($scope.currAckno)
        //    //});
        //    //console.log($rootScope.ackno);
        //    // $rootScope.ackno = Ackno
        //     dataPromise.success(function (result) {
        //        // console.log(result.data)
        //         $scope.currAckno.ackno = result.ackno
        //         //console.log($scope.currAckno.ackno)
        //     })
        // console.log($scope.currAckno[0].ackno)
        //$timeout(function () {
       //     if ($scope.ackno.value == 1) {
       //         $scope.ackno.value = 2;
       //     }
       //     else {
       //         $scope.ackno.value = 1;
       //     }
       //    // $rootScope.$apply();
       //// }, 1000);
       // //$scope.$apply();
       // return $scope.ackno.value
        
    }
    
}]);

app.controller('propertyController', ['$scope', '$state','dataFactory', function ($scope, $state, dataFactory) {

    $scope.districts = {}
    $scope.circles = {}
    $scope.RevVillages = {}

    init();

    function init() {
        getDistricts()
        getCircles()
        getRevVillages()

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

    $scope.nextparty = function () {
        $scope.state = $state;
        $state.go('registration.content.forms.executant');
    }
    //$scope.showvillage = function (village) {
    //   return village === 
    //}
}]);