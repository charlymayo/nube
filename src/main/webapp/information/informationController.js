(function () {
    'use strict';
    var app = angular.module('excelapp');

    app.controller('informationController', ['informationService', '$log', '$location', '$scope', '$routeParams', function(informationService, $log, $location, $scope, routeParams) {
        var self = this;

        self.rowWasAdded = false;
        self.selectedRowId = -1;
        self.editingRowId = -1;
        self.waitingForConfirmation = false;
        self.backup = null;
        self.table = null;
        self.action = '';

        self.findRow = function(rowId){
            for(var i = 0; i < self.table.tRows.length; i++)
                if(self.table.tRows[i][0] == rowId)
                    return i;
                return -1;
        };

        self.getTemplate = function(rowId){
            if(parseInt(rowId) == self.editingRowId)
                return 'edit';
            return 'display';
        };

        self.clickCancel = function(){
            if(!self.rowWasAdded)
                self.table.tRows[self.findRow(self.selectedRowId)] = self.backup;
            else {
                self.table.tRows.pop();
                self.rowWasAdded = false;
            }
            self.waitingForConfirmation = false;
            self.editingRowId = -1;
        };

        self.clickConfirm = function(){
            informationService.TSendModification(self.action, self.table.tRows[self.findRow(self.selectedRowId)], self.table.title);
            self.waitingForConfirmation = false;
            self.editingRowId = -1;
            self.rowWasAdded = false;
        };

        self.clickRow = function(rowId){
            if(!self.waitingForConfirmation)
                self.selectedRowId = parseInt(rowId);
        };

        self.editRow = function(){
            self.action = 'update';
            self.editingRowId  = self.selectedRowId;
            self.waitingForConfirmation = true;
            self.backup = self.table.tRows[self.findRow(self.selectedRowId)];
        };

        self.addRow = function(){
            self.action = 'insert';
            self.rowWasAdded = true;
            self.table.tRows.push([' ',' ',' ',' ',' ']);
            self.selectedRowId = self.table.tRows.length;
            self.editingRowId  = self.selectedRowId;
        };


        self.getJson = function() {
            informationService.getJson(routeParams.table).then(function(response) {
                self.table = response;
            });
        };
        self.getJson();
    }]);
})();