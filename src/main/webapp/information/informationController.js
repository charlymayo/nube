(function () {
    'use strict';
    var app = angular.module('excelapp');

    app.controller('informationController', ['informationService', '$log', '$location', '$scope', '$routeParams', function(informationService, $log, $location, $scope, routeParams) {
        var self = this;

        self.selectedRowIndex = -1;
        self.editingRowIndex = -1;
        self.waitingForConfirmation = false;
        self.table = null;
        self.action = '';

        self.getTemplate = function(rowIndex){
            if(parseInt(rowIndex) == self.editingRowIndex)
                return 'edit';
            if(parseInt(rowIndex) == self.selectedRowIndex && self.waitingForConfirmation && self.action == 'delete')
                return 'delete';
            return 'display';
        };

        self.clickCancel = function(){
            self.waitingForConfirmation = false;
            self.editingRowIndex = -1;
            self.getJson();
        };

        self.clickConfirm = function(){
            informationService.TSendModification(self.action, self.table.tRows[self.selectedRowIndex], self.table.title);
            self.waitingForConfirmation = false;
            self.editingRowIndex = -1;
            self.getJson();
        };

        self.clickRow = function(rowIndex){
            if(!self.waitingForConfirmation)
                self.selectedRowIndex = parseInt(rowIndex);
        };

        self.editRow = function(){
            self.action = 'update';
            self.editingRowIndex  = self.selectedRowIndex;
            self.waitingForConfirmation = true;
        };

        self.deleteRow = function(){
            self.action = 'delete';
            self.waitingForConfirmation = true;
        };

        self.addRow = function(){
            self.action = 'insert';
            var tmp = [];
            for(var i = 0; i < self.table.tRows[0].length; i++)
                tmp.push('');
            self.table.tRows.push(tmp);
            self.selectedRowIndex = self.table.tRows.length - 1;
            self.editingRowIndex  = self.selectedRowIndex;
            self.waitingForConfirmation = true;
        };


        self.getJson = function() {
            informationService.getJson(routeParams.table).then(function(response) {
                self.table = response;
            });
        };
        self.getJson();
    }]);
})();