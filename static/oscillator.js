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

    sendMessage('bpm', viewValue);

};


// CHANGE WAVEFORM
function setOscillatorType() {
        let waveformSelect = document.getElementById("waveform");
        if(oscillator){
            oscillator.type = waveformSelect.options[waveformSelect.selectedIndex].text;
        }
        console.log('waveform set');
}

function playSound(freqValue = 0) {

    if(!isPlaying) {
        oscillator = context.createOscillator();
        oscillator.connect(gainNode);
        setOscillatorType();
        oscillator.frequency.value = freqValue;
        oscillator.start(context.currentTime);
        isPlaying = true;

       sendMessage('videostatus', 'True')
    }
}

let sec = 1 / (60 * (60/120));

function stopSound() {
    if(oscillator){
        console.log('STOP')
        oscillator.stop(context.currentTime);
        oscillator.disconnect();
        isPlaying = false;

       sendMessage('videostatus', 'False')
    }
}

function changeOscillatorFreq(freqValue){
    if(oscillator){
         oscillator.frequency.value = freqValue;
    } else {
        console.log('osc not active')
    }
}



