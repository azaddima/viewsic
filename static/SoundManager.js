let pentatonicMinor = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24];
let pentatonicMajor = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
let majorScale = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24];
let minorScale = [0, 2, 3, 5 , 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24];
let scaleList = [majorScale, minorScale, pentatonicMajor, pentatonicMinor];

let octave = 3;
let keyOf = 3;

let activeScale = [];

// HTML access
let selectedScaleIndex = document.getElementById("scales").selectedIndex;

function loadScale(keyNote, octave, scale){
    activeScale = createScale(keyNote, octave, scale );
}
// Default scale
loadScale(0, 3, minorScale);

function setScaleType() {
    // Update global variable
    selectedScaleIndex = document.getElementById("scales").selectedIndex;
    console.log('scale changed to: ' + selectedScaleIndex);
    loadScale(keyOf, octave, scaleList[selectedScaleIndex]);
}


function changeKey(note){
    keyOf = note
    loadScale(keyOf, octave, scaleList[selectedScaleIndex]);
}

function changeOctave(note){
    octave = note
    loadScale(keyOf, octave, scaleList[selectedScaleIndex]);
}


function calcActiveSound(data){
    //RANDOM KEY
    let playKey = data[0] % activeScale.length;

    console.log('key of scale: ' + playKey);
    console.log('Active Note Freq: ' + activeScale[playKey]);


    changeOscillatorFreq(activeScale[playKey])
}
