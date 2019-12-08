video = document.getElementById("video");

document.getElementById("playbtn").onclick = function () {

    video.play();
    playSound();
};

document.getElementById("stopbtn").onclick = function () {

    video.pause();
    stopSound();
};