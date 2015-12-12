var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);
socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	momentTimestamp.local();
	var $message = jQuery('.messages');
	console.log('New app.js message: ');
	console.log(message.text);
	$message.append('<p><strong>'+message.name +' '+momentTimestamp.format('h:mm:ssa') +'</strong></p>');
	$message.append('<p>'+ message.text +'</p>');
});

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event){
	event.preventDefault(); 
	//if you dont want to submit the old fashion way so that you dont have to keep refreshing the page

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});
	$message.val('');
});