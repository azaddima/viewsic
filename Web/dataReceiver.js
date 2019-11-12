var freqValueContour = 0;
var socket = new WebSocket("ws://127.0.0.1:8765/");

socket.onmessage = function (event) {
   let data = event.data;
   freqValueContour = parseInt(data) * 10;

   if(true){
         console.log("Data received: " + freqValueContour);
   }

   //todo - change method access!
   changeOscillatorFreq(freqValueContour);
};
