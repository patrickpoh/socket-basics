var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	console.log('New message: ');
	console.log(message.text);
});

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event){
	event.preventDefault(); 
	//if you dont want to submit the old fashion way so that you dont have to keep refreshing the page

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});
	$message.val('');
});