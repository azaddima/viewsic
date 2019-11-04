/*let audioContext = new AudioContext();
let oscList = [];
let masterGainNode = null;

let volumeControl = document.querySelector("input[name='volume']");

let noteFreq = null;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;*/

var cmajor = [32.703195662574829, 36.708095989675945, 41.203444614108741,
              43.653528929125485, 48.999429497718661, 55.000000000000000,
              61.735412657015513, 32.703195662574829 * 2];

var context = new AudioContext(),
    oscillator,
    isPlaying = false;
    gainNode = context.createGain(),
    slider = document.getElementById("myRange"),
    output = document.getElementById("demo");
    output.innerHTML = slider.value;

gainNode.connect(context.destination);

slider.oninput = function() {
  var gainValue = (this.value / 100),
      viewValue = gainValue * 100;
  output.innerHTML = viewValue + "";
  gainNode.gain.value = gainValue;
};

function playSound() {
    if(isPlaying === false) {
        var e = document.getElementById("waveform");
        var type = e.options[e.selectedIndex].text;
        oscillator = context.createOscillator();
        oscillator.connect(gainNode);
        oscillator.type = type;
        oscillator.frequency.setTargetAtTime(440, context.currentTime, 0.01);
        //gainNode.gain.setTargetAtTime(0.9, context.currentTime, 0.01);
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
