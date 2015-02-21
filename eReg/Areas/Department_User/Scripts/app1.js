var app = angular.module('eRegDeptApp', ['ngRoute']);

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {
    var urlbase = '/Views/Home/';
    $routeProvider.when('/Department_User', {
        //controller: 'simpleController',
        templateUrl: '/Areas/Department_User/app/view/home.html'
    })
   //.when('/Home/registration', {
   //    controller: 'simpleController',
   //    templateUrl: 'Home/registration.html'
   //})
   //.when('/Home/login', {
   //    controller: 'simpleController',
   //    templateUrl: 'Home/login.html'
   //})

   .otherwise({ redirectTo: '/Department_User' });
    // $locationProvider.html5Mode(false).hashPrefix("!");
    $locationProvider.html5Mode(true);
}]);