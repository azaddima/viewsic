/*let audioContext = new AudioContext();
let oscList = [];
let masterGainNode = null;

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
var cmajor = [32.703195662574829, 36.708095989675945, 41.203444614108741,
              43.653528929125485, 48.999429497718661, 55.000000000000000,
              61.735412657015513, 32.703195662574829 * 2];

var context = new AudioContext(),
    oscillator,
    isPlaying = false;
    gainNode = context.createGain();

gainNode.connect(context.destination);

function playSound() {
    if(isPlaying === false) {
        var e = document.getElementById("waveform");
        var type = e.options[e.selectedIndex].text;
        oscillator = context.createOscillator();
        oscillator.connect(gainNode);
        oscillator.type = type;
        oscillator.frequency.setTargetAtTime(440, context.currentTime, 0.01);
        gainNode.gain.setTargetAtTime(0.9, context.currentTime, 0.01);
        oscillator.start(context.currentTime);
        isPlaying = true;
    }
}

function stopSound() {
    if(oscillator){
    oscillator.stop(context.currentTime);
    oscillator.disconnect();
    isPlaying = false;
    }
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
