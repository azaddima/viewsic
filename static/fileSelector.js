jQuery(document).ready(function($){

// Click button to activate hidden file input
$('#selectVideo').on('click', function(){
$('#selectDialog').click();
});

// Click above calls the open dialog box
// Once something is selected the change function will run
$('#selectDialog').change(function(){

// Create new FileReader as a variable
let reader = new FileReader();

function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

// Onload Function will run after video has loaded
reader.onload = function(file){
let fileContent = file.target.result;
console.log(fileContent, typeof fileContent);
let index = fileContent.search(',');
let byteArray = fileContent.slice(index + 1);
console.log(byteArray);

$('body').append('<video id="video" src="' + fileContent + '" width="100%" height="auto" muted loop></video>');
};

// Get the selected video from Dialog
reader.readAsDataURL(this.files[0]);

});

});