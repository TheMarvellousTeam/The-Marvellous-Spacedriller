console.log('hello')

require('./staticServer')

var io = require('socket.io')(1984)

io.on('connection', function(socket){
	console.log('Another fucking user incoming !')

	socket.on('disconnect', function(){
		console.log('A fucking user has been disconnected')
	})
})
