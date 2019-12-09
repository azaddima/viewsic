let video = document.getElementById("video");
let source = document.createElement('source');
let fileReader = new FileReader();
const dialog = document.getElementById("selectDialog");
const selVideo = document.getElementById("selectVideo");


selVideo.addEventListener("click", function () {
   dialog.click();
});

dialog.addEventListener("change", function () {
    if (dialog.value){
        console.log(dialog.value.toString());
        source.setAttribute('src', '../videos/testVideo720p.mp4');
        source.setAttribute('type','video/mp4');
        video.appendChild(source);
    }
    console.log(source.src);
});

document.getElementById("playbtn").onclick = function () {
    // video.play();

    playSound();

};

document.getElementById("stopbtn").onclick = function () {

    // video.pause();
    stopSound();
};
