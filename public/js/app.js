var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	momentTimestamp.local();
	console.log('New app.js message: ');
	console.log(message.text);

	jQuery('.messages').append('<p>'+'<strong>'+momentTimestamp.format('h:mm:ssa')+': </strong>'+ message.text +'</p>');
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