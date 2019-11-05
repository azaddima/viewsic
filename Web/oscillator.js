/*let audioContext = new AudioContext();
let oscList = [];
let masterGainNode = null;

let volumeControl = document.querySelector("input[name='volume']");

let noteFreq = null;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;*/

let cmajor = [32.703195662574829, 36.708095989675945, 41.203444614108741,
    43.653528929125485, 48.999429497718661, 55.000000000000000,
    61.735412657015513, 32.703195662574829 * 2];

let context = new AudioContext(),
    oscillator,
    isPlaying = false;
    gainNode = context.createGain(),
    slider = document.getElementById("myRange"),
    output = document.getElementById("demo");
    output.innerHTML = slider.value;

gainNode.connect(context.destination);

slider.oninput = function() {
    let gainValue = (this.value / 100),
        viewValue = gainValue * 100;
        output.innerHTML = viewValue + "";
        gainNode.gain.value = gainValue;
};

function setOscillatorType() {
    let e = document.getElementById("waveform");
    return oscillator.type = e.options[e.selectedIndex].text;
}

document.getElementById("playbtn").onclick = function () {
    playSound(880)
};



function playSound(frequencyValContour) {
    if(!isPlaying) {
        oscillator = context.createOscillator();
        oscillator.connect(gainNode);
        setOscillatorType();
        oscillator.frequency.value = frequencyValContour;
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
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
