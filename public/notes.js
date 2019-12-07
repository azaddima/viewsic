let noteFreq = [];

function createNoteTable(){

    for (let i = 0; i < 7; i++) {
        noteFreq[i] = [];
    }

    // Init Octave 1
   noteFreq[0][9] = 27.500000000000000;
   noteFreq[0][10] = 29.135235094880619;
   noteFreq[0][11] = 30.867706328507756;

   noteFreq[1][0] = 32.703195662574829;
   noteFreq[1][1] = 34.647828872109012;
   noteFreq[1][2] = 36.708095989675945;
   noteFreq[1][3] = 38.890872965260113;
   noteFreq[1][4] = 41.203444614108741;
   noteFreq[1][5] = 43.653528929125485;
   noteFreq[1][6] = 46.249302838954299;
   noteFreq[1][7] = 48.999429497718661;
   noteFreq[1][8] = 51.913087197493142;
   noteFreq[1][9] = 55.000000000000000; 
   noteFreq[1][10] = 58.270470189761239;
   noteFreq[1][11] = 61.735412657015513;

    // Calculate octave:0
   for(index = 0; index < 9; index++){
       noteFreq[0][index] = noteFreq[1][index] / 2;
   }

    // Calculate Octave:2-6
   for (let octave = 2; octave < noteFreq.length; octave++) {
       for (let note = 0; note < 12; note++) {
           noteFreq[octave][note] = noteFreq[octave - 1][note] * 2   
       }
   }

}

createNoteTable();

function createScale(keyNote, octave = 3, myScale = [0, 2, 4, 5, 7, 9, 11] ){
    console.log('Scale length:' + myScale.length);

    // Create empty scale
    let scale = [];

    let currentOctave = octave;
    let currentNote = keyNote;
    for(scaleIndex = 0; scaleIndex < myScale.length; scaleIndex++){
    
        scale[scaleIndex] = noteFreq[currentOctave][currentNote];
        console.log('Note: ' + currentNote + ', Octave: ' + currentOctave);

        // stop calculation if last note is added to scale
        if(scaleIndex == myScale.length - 1) break;

        //todo - cant go above octave 5, because the scale static: make dynamic when going above
        // calculate next note position
        currentNote += myScale[scaleIndex+1] - myScale[scaleIndex];
        if(currentNote > 11){
            currentNote = currentNote % 12;
            currentOctave++;
        }

    }

    //console.log(scale);
    return scale;
}


