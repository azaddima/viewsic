var socket = new WebSocket("ws://127.0.0.1:8765/");

socket.onmessage = function (event) {
   let data = event.data;
   console.log("Data received: " + data);
}

