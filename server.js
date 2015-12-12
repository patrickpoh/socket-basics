var PORT = process.env.PORT || 3000;
var express = require('express');
var app  = express();
var http =  require('http').Server(app); //tells node to to use the same server.
var io = require('socket.io')(http); //think of io as the app varaible

app.use(express.static(__dirname + '/public'));

io.on('connection', function(){
	console.log('User connected via socket.io!');
});  //allow you to listen for events

http.listen(PORT, function (){
	console.log('Server started!');
});