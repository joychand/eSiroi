
'use strict';
angular.module('eRegApp')
    .directive('loading-Widget', ['requestNotificationChannel', function (requestNotificationChannel) {
    return {
        restrict: "A",
        link: function (scope, element) {
            // hide the element initially
            element.hide();

            var startRequestHandler = function () {
                // got the request start notification, show the element
                console.log('directive call');
                element.show();
            };

            var endRequestHandler = function () {
                // got the request start notification, show the element
                element.hide();
            };
            
            requestNotificationChannel.onRequestStarted(scope, startRequestHandler);

            requestNotificationChannel.onRequestEnded(scope, endRequestHandler);
        }
    };
}]);