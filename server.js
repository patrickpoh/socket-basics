var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app  = express();
var http =  require('http').Server(app); //tells node to to use the same server.
var io = require('socket.io')(http); //think of io as the app varaible


app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('User connected via socket.io!');
	socket.on('message', function (message){
		console.log('Message received: ' + message.text);
		message.timestamp = moment().valueOf();
		io.emit('message', message); //sent out to everybody 

	});


	//timestamp property = JavaScript timestamp (milliseconds)
	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	});
});  //allow you to listen for events

http.listen(PORT, function (){
	console.log('Server started!');
});