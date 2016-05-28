(function () {
    'use strict';
    var app = angular.module('excelapp');
    app.factory('informationService', ['$http',function($http) {
        var config = {headers:  {
            'Content-Type': "application/json; charset=utf-8"
        }
        };
        return {
            getJson: function(tableName){

                function Table(){
                    this.title = "";
                    this.tHeaders = [];
                    this.tRows = [];
                }

                var table = new Table();

                return $http.get('http://testserver01.enlacenet.net:3000/gettabla?tabla=' + tableName)
                    .then(function(response) {

                        for(var keyName in response.data){
                            table.title = tableName;
                            break;
                        }

                        var headersReady = false;
                        response.data.forEach(function(element){
                            var row = [];
                            angular.forEach(element, function(key, value) {
                                row.push(key);
                                if(!headersReady)
                                    table.tHeaders.push(value);
                            });
                            table.tRows.push(row);
                            headersReady = true;
                        });

                        return table;

                    }, function(response) {
                        return $q.reject(response.data)
                       });
            },
            TSendModification: function(action, row, table){
                
                var req = {
                    method: 'POST',
                    url: 'http://testserver01.enlacenet.net:3000/update',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data:  'data=' + row.join() + '&action=' + action + 'table=' + table
                };

                $http(req).then(function(){alert("ok")}, function(){alert("error")});
            }

        }


    }])
})();