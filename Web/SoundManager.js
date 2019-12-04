//#document.write('<script type="text/javascript" src="dataReceiver.js"></script>');
let pentatonicMinor = [0, 3, 5, 7, 10, 12];
let pentatonicMajor = [0, 2, 4, 7, 9, 12];
let majorScale2 = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23 ]

let activeScale = [];
// todo - put this into events from buttonchanges!
function initSound(){
    //todo - remove after color wheel is implemented!
    let keyTone = 5;
    // default is major scale
    activeScale = createScale(keyTone, 3,  pentatonicMinor );
}

initSound();

function calcActiveSound(data){

    //RANDOM KEY
    let playKey = data % activeScale.length;

    console.log('CalculatedKey: ' + playKey);
    console.log('Active Note: ' + activeScale[playKey]);


    changeOscillatorFreq(activeScale[playKey])
}
