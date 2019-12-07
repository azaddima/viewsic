let pentatonicMinor = [0, 3, 5, 7, 10, 12];
let pentatonicMajor = [0, 2, 4, 7, 9, 12];
let majorScale = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23 ];
let minorScale = [0, 2, 3, 5 , 7, 8, 10, 11, 12];
let scaleList = [majorScale, minorScale, pentatonicMajor, pentatonicMinor];

let octave = 3;
let key = 3;

let activeScale = [];

// HTML access
let selectedScaleIndex = document.getElementById("scales").selectedIndex;

function loadScale(keyNote, octave, scale){
    activeScale = createScale(keyNote, octave, scale );
}
// default scale
loadScale(0, 3, minorScale);

function setScaleType() {
        //let scaleSelect = document.getElementById("scales").options;
    selectedScaleIndex = document.getElementById("scales").selectedIndex;
    console.log('scale changed to: ' + selectedScaleIndex);

    loadScale(octave, key, scaleList[selectedScaleIndex]);
}


function changeKey(){
    //CHANGE KEY CODE

    loadScale(key, octave, scaleList[selectedScaleIndex]);
}

function changeOctave(){
    // CHANGE OCTAVE CODE

    loadScale(key, octave, scaleList[selectedScaleIndex]);
}


function calcActiveSound(data){
    //RANDOM KEY
    let playKey = data[0] % activeScale.length;

    console.log('key of scale: ' + playKey);
    console.log('Active Note Freq: ' + activeScale[playKey]);


    changeOscillatorFreq(activeScale[playKey])
}
