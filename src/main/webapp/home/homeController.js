(function () {
    'use strict';
    var app = angular.module('excelapp');

    app.controller('homeController', ['homeService', '$log', '$location', '$scope', function(homeService, $log, $location, $scope) {
        var self = this;

        self.tables = [];

        self.getTables = function() {
            homeService.getTables().then(function(response) {
                self.tables = response;
            });
        };

        self.showTable = function(tableName) {
            $location.path("/information/" + tableName);

        };

        var isAdvancedUpload = function() {
            var div = document.createElement( 'div' );
            return ( ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div ) ) && 'FormData' in window && 'FileReader' in window;
        }();

        $( '.box' ).each( function()
        {
            var $form		 = $( this ),
                $input		 = $form.find( 'input[type="file"]' ),
                $label		 = $form.find( 'label' ),
                $errorMsg	 = $form.find( '.box__error span' ),
                $restart	 = $form.find( '.box__restart' ),
                droppedFiles = false,
                showFiles	 = function( files ) {
                    $label.text( files.length > 1 ? ( $input.attr( 'data-multiple-caption' ) || '' ).replace( '{count}', files.length ) : files[ 0 ].name );
                };

            // letting the server side to know we are going to make an Ajax request
            $form.append( '<input type="hidden" name="ajax" value="1" />' );

            // automatically submit the form on file select
            $input.on( 'change', function( e ) {
                showFiles( e.target.files );
                $form.trigger( 'submit' );
                self.getTables();
            });


            // drag&drop files if the feature is available
            if( isAdvancedUpload ) {
                $form
                    .addClass( 'has-advanced-upload' ) // letting the CSS part to know drag&drop is supported by the browser
                    .on( 'drag dragstart dragend dragover dragenter dragleave drop', function( e )
                    {
                        // preventing the unwanted behaviours
                        e.preventDefault();
                        e.stopPropagation();
                    })
                    .on( 'dragover dragenter', function() //
                    {
                        $form.addClass( 'is-dragover' );
                    })
                    .on( 'dragleave dragend drop', function()
                    {
                        $form.removeClass( 'is-dragover' );
                    })
                    .on( 'drop', function( e )
                    {
                        droppedFiles = e.originalEvent.dataTransfer.files; // the files that were dropped
                        var formData = new FormData();


                        console.log('loading file');
                        var file= droppedFiles.item(0);
                        formData.append('file',file);

                        var request = new XMLHttpRequest();
                        request.open('POST', "/upload");
                        request.send(formData);
                        self.getTables();
                    });
            }

        });

        self.getTables();
    }]);
})();