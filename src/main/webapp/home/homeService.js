(function () {
    'use strict';
    var app = angular.module('excelapp');
    app.factory('homeService', ['$http',function($http) {
        var config = {headers:  {
            'Content-Type': "application/json; charset=utf-8"
        }};
        return {
            getTables: function(){
                var tables = [];
                return $http.get('http://testserver01.enlacenet.net:3000/tablas')
                    .then(function(response) {
                        response.data.forEach(function(element) {
                            tables.push(element.tabla);
                        });
                        return tables;
                    }, function(response) {
                        return $q.reject(response.data)
                    });
            }
        }
    }])
})();