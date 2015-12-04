
module.exports = function (io) {
	console.log('in sio.js')
	io.on('connection', function(ws){
		console.log('somebody connected')
		ws.on('switchLid', function(lid) {
			ws.leave(ws.rooms[0])
			console.log('joined: ' + lid)
			ws.join(lid, function() {
				console.log(ws.rooms)
			});
		});
		ws.on('message', function incoming(message) {
			console.log(message)
			console.log(ws.rooms[0])
			ws.emit('itemChanged', message)			
		});		
		ws.on('message to room', function incoming(message) {
			console.log(message)
			console.log(ws.rooms[0])
			io.to(ws.rooms[0]).emit('roomMessage', message)			
		});		
	});
}