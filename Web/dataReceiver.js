let data;
let socket = new WebSocket("ws://127.0.0.1:8765/");
let sendSocket = new WebSocket("ws://127.0.0.1:1234/")

socket.onmessage = function (event) {

   data = JSON.parse(event.data);

   if(true){
         console.log("Data received: " + data);
   }

   //todo - add update method which accesses all needed methods!
   calcActiveSound(data);
   //changeOscillatorFreq(freqValueContour);
};


function sendMessage(type, data){

      dataArray = [type, data];
      jsonData = JSON.stringify(dataArray);

      if(sendSocket.readyState == WebSocket.OPEN){
            console.log('trying to send message');
            sendSocket.send(jsonData);

      }
}