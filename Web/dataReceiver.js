let data;
let socket = new WebSocket("ws://127.0.0.1:8765/");

socket.onmessage = function (event) {

   //todo - make this an event?
   data = event.data;

   if(true){
         console.log("Data received: " + data);
   }

   //todo - change method access!
   calcActiveSound(data);
   //changeOscillatorFreq(freqValueContour);
};
