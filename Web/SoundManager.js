//#document.write('<script type="text/javascript" src="dataReceiver.js"></script>');

let activeScale = [];
// todo - put this into events from buttonchanges!
function initSound(){
    //todo - remove after color wheel is implemented!
    let keyTone = 5;
    // default is major scale
    activeScale = createScale(keyTone, 3);
}

initSound();

function calcActiveSound(data){

    let playKey = data % 7;
    console.log('CalculatedKey: ' + playKey);
    console.log(activeScale[playKey]);
    changeOscillatorFreq(activeScale[playKey])
}
