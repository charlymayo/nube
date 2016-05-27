(function () {
    'use strict';
    angular.module('excelapp', ['ngRoute', 'ngCookies'])
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){


            $routeProvider.when('/', {
                    templateUrl: '/home/home.html',
                    controller: 'homeController as ctrl'
                })
                .when('/information/:table', {
                    templateUrl: '/information/information.html',
                    controller: 'informationController as ctrl'
                })
                .otherwise({redirectTo: '/'});
        }]);
})();