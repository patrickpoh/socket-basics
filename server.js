var PORT = process.env.PORT || 3000;
var express = require('express');
var app  = express();
var http =  require('http').Server(app); //tells node to to use the same server.
var io = require('socket.io')(http); //think of io as the app varaible

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('User connected via socket.io!');
	socket.on('message', function (message){
		console.log('Message received: ' + message.text);
		io.emit('message', message); //sent out to everybody 

	});
	socket.emit('message', {
		text: 'Welcome to the chat application!'
	});
});  //allow you to listen for events

http.listen(PORT, function (){
	console.log('Server started!');
});