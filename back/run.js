require('./staticServer')

import {BackModel} from './src/model'
var model = new BackModel()

var io = require('socket.io')(1984)
io.on('connection', function(socket){
	console.log('new connection')

    socket.on('disconnect', function(){
        var nick = model.removePlayer(socket)
        console.log(nick + ' disconnected')
        model.getSockets().forEach(s => s.emit('players_update', {players: model.getNicknames()}))
    })

    socket.on('error', function(err){
        var nick = model.removePlayer(socket)
        console.log(nick + ' crashed')
        model.getSockets().forEach(s => s.emit('players_update', {players: model.getNicknames()}))
    })

    socket.on('ready', function(data) {
        var team = model.addPlayer(socket, data.name)
        model.getSockets().forEach(s => s.emit('players_update', {players: model.getNicknames()}))
        
        socket.emit('start', {team: team, cube: model.getSerializedCube()})
        console.log(data.name + ' is ready')
    })

    socket.on('fire', function(data){
        if( model.addFire(data) ) {
            // resolve all fires
            // send new turn
        }
    })
})
