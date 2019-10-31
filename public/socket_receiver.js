function initialize(){
	var socket = io.connect();

	socket.on("position", function(data){
		console.log(data.c_count + " contours found");
	});

}