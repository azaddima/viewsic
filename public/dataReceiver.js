let data;
let socket = new WebSocket("ws://127.0.0.1:8765/");
let sendSocket = new WebSocket("ws://127.0.0.1:1234/")

socket.onmessage = function (event) {

   data = JSON.parse(event.data);

   if(true){
         console.log("Data received: " + data);
   }

   //todo - add update method which accesses all needed methods!
   calcActivpeSound(data);
   //changeOscillatorFreq(freqValueContour);
};


function sendMessage(type, data){

      dataArray = [type, data];
      jsonData = JSON.stringify(dataArray);

      if(sendSocket.readyState == WebSocket.OPEN){
            console.log('trying to send message');
            sendSocket.send(jsonData);
            sendSocket.send(jsonData);

      }
}

function initialize(){
	let socket = io.connect();


	socket.on("soundData", function(data){
            //document.getElementById("label").innerHTML = `Position: x=${data.x}, y=${data.y}`;
            console.log('sounddata received:' +  data);
            calcActiveSound(data);
	});

	socket.on('outputFrame'), function (data) {
        //decode byte array

    }

}