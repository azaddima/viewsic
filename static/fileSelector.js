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

// Onload Function will run after video has loaded
reader.onload = function(file){
let fileContent = file.target.result;
console.log(fileContent, typeof fileContent);
let index = fileContent.search(',');
let byteArray = fileContent.slice(index + 1);
console.log(byteArray);
sendMessage("videoFile", byteArray);
upload(byteArray, "myVideo.mp4");
};

// Get the selected video from Dialog
reader.readAsDataURL(this.files[0]);

function upload(text, name, type) {
  let fileWriter = new File(text, name);
  //let file = new Blob([text], {type: type});
}

});

});