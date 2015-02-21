
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
        $scope.transactions = majortrans;
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
        
     

        //$scope.route1Active = true;
        //activate();

        //function activate() { }
    }
})();

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('dataEntryformController', ['$scope', '$state', dataEntryformController]);

    function dataEntryformController($scope, $state) {
        $scope.visibility = true;
        $scope.click = false;
        $scope.getOnline = function () {
            $scope.visibility = false;
            $scope.click = true;
        }
        $scope.cancel = function () {
            $scope.visibility = true;
            $scope.click = false;
        }



        //$scope.route1Active = true;
        //activate();

        //function activate() { }
    }
})();

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptPropController', ['$scope', '$state', 'district', deptPropController]);

    function deptPropController($scope, $state, district) {
        $scope.districts = district;


        //$scope.route1Active = true;
        //activate();

        //function activate() { }
    }
})();

(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('deptExeController', ['$scope', '$state',  deptExeController]);

    function deptExeController($scope, $state) {
        //$scope.districts = district;
        console.log('TS:' + $scope.$parent.tsyear.ts)


        //$scope.route1Active = true;
        //activate();

        //function activate() { }
    }
})();