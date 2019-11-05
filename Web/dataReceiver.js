let freqValueContour = 0;
let socket = new WebSocket("ws://127.0.0.1:8765/");

socket.onmessage = function (event) {
   let data = event.data;
   freqValueContour = parseInt(data);
   console.log("Data received: " + freqValueContour);
   return freqValueContour
};
