/*let audioContext = new AudioContext();
let oscList = [];
let masterGainNode = null;

let wavePicker = document.querySelector("select[name='waveform']");
let volumeControl = document.querySelector("input[name='volume']");

let noteFreq = null;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;*/

function createNoteTable() {
    let noteFreq = [];
    for (let i = 0; i < 9; i++) {
        noteFreq[i] = [];
    }

    noteFreq[0]["A"] = 27.500000000000000;
    noteFreq[0]["A#"] = 29.135235094880619;
    noteFreq[0]["B"] = 30.867706328507756;

    noteFreq[1]["C"] = 32.703195662574829;
    noteFreq[1]["C#"] = 34.647828872109012;
    noteFreq[1]["D"] = 36.708095989675945;
    noteFreq[1]["D#"] = 38.890872965260113;
    noteFreq[1]["E"] = 41.203444614108741;
    noteFreq[1]["F"] = 43.653528929125485;
    noteFreq[1]["F#"] = 46.249302838954299;
    noteFreq[1]["G"] = 48.999429497718661;
    noteFreq[1]["G#"] = 51.913087197493142;
    noteFreq[1]["A"] = 55.000000000000000;
    noteFreq[1]["A#"] = 58.270470189761239;
    noteFreq[1]["B"] = 61.735412657015513;
}

var context = new AudioContext(),
    oscillator,
    mousedown = false,
    gainNode = context.createGain();

gainNode.connect(context.destination);

document.getElementById('playbtn').addEventListener('click', playSound);


document.addEventListener("mouseup", function(e) {
    mousedown = false;

    if (oscillator) {
        oscillator.stop(context.currentTime);
        oscillator.disconnect();
    }
});

function calculateFrequencyAndGain() {
    // fix for click sound bug:
    oscillator.frequency.setTargetAtTime(440, context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(0.9, context.currentTime, 0.01);
}

function playSound() {
    oscillator = context.createOscillator();
    oscillator.connect(gainNode);
    oscillator.frequency.setTargetAtTime(440, context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(0.9, context.currentTime, 0.01);
    oscillator.start(context.currentTime);
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
