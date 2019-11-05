let noteFreq = [];
let majorScales = [];

function createNoteTable(){

    for (let i = 0; i < 7; i++) {
        noteFreq[i] = [];
    }

   noteFreq[0][0] = 27.500000000000000;
   noteFreq[0][1] = 29.135235094880619;
   noteFreq[0][2] = 30.867706328507756;

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

   for (let octave = 2; octave < noteFreq.length; octave++) {
       for (let note = 0; note < 12; note++) {
           noteFreq[octave][note] = noteFreq[octave - 1][note] * 2   
       }
   }
}

createNoteTable();
console.log(noteFreq[0].length);
console.log("hello");

function createMajorScale(){
    // 0 2 4 5 7 9 11
    scales = [];
    for(var i = 0; i < 8; i++){
        scales[i] = [];
    }       

    scale[i][0] = noteFreq[1]
}

