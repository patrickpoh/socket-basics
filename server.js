var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app  = express();
var http =  require('http').Server(app); //tells node to to use the same server.
var io = require('socket.io')(http); //think of io as the app varaible


app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket) {
	console.log('User connected via socket.io!');
	socket.on('disconnect', function(){
		var userData = clientInfo[socket.id];
		if(typeof userData !== 'undefined'){
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left!',
				timestamp: moment.valueOf()
			});
			delete userData;
		}
	});
	socket.on('joinRoom', function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		});
	});
	socket.on('message', function (message){
		console.log('Message received: ' + message.text);
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message); //sent out to everybody 

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