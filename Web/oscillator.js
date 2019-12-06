/*let audioContext = new AudioContext();
let oscList = [];
let masterGainNode = null;

let volumeControl = document.querySelector("input[name='volume']");

let noteFreq = null;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;*/


let context = new AudioContext(),
    oscillator,
    isPlaying = false;
    gainNode = context.createGain(),
    slider = document.getElementById("volume"),
    output = document.getElementById("volumeOut"),
    sliderBPM = document.getElementById("tempo"),
    outputBPM = document.getElementById("bpm");
    output.innerHTML = slider.value;
    outputBPM.innerHTML = sliderBPM.value;

gainNode.connect(context.destination);

slider.oninput = function() {
    let gainValue = (this.value / 100),
        viewValue = gainValue * 100;
        output.innerHTML = viewValue + "";
        gainNode.gain.value = gainValue;
};

sliderBPM.oninput = function() {
    let viewValue = this.value;
        outputBPM.innerHTML = viewValue + "";
};


// CHANGE WAVEFORM
function setOscillatorType() {
        let waveformSelect = document.getElementById("waveform");
        if(oscillator){
            oscillator.type = waveformSelect.options[waveformSelect.selectedIndex].text;
        }
        console.log('waveform set');
}


document.getElementById("playbtn").onclick = function () {

    //todo - set default note?
    playSound(0);

};

function playSound(freqValue) {
    if(!isPlaying) {
        oscillator = context.createOscillator();
        oscillator.connect(gainNode);
        setOscillatorType();
        oscillator.frequency.value = freqValue;
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

function changeOscillatorFreq(freqValue){
    if(oscillator){
         oscillator.frequency.value = freqValue;
    } else {
        console.log('osc not active')
    }
}
