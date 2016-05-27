/**
 * Created by charl on 18/03/2016.
 */
$(document).ready(function() {
    var filedrag = document.getElementById("fileDrag");


    function FileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }

    function FileSelectHandler(e) {

        // cancel event and hover styling
        FileDragHover(e);
        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;

        sendFile(files);
    }

    function sendFile(files){
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

// now post a new XHR request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload');
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('all done: ' + xhr.status);
            } else {
                console.log('Something went terribly wrong...');
            }
        };

        xhr.send(formData);

    }
    function go(fileName){
        window.location.href = "www.mediotiempo.com";
    }

    filedrag.addEventListener("dragover", FileDragHover, false);
    filedrag.addEventListener("dragleave", FileDragHover, false);
    filedrag.addEventListener("drop", FileSelectHandler, false);
    filedrag.style.display = "block";
});

