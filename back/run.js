require('./staticServer')
var io = require('socket.io')(1984)

import {BackModel} from './src/model'

import {cubeSize} from '../common/params'

var model = new BackModel( cubeSize )


io.on('connection', function(socket){
	console.log('new connection')

    socket.on('disconnect', function(){
        var nick = model.removePlayer(socket)
        console.log(nick + ' disconnected')
        model.getSockets().forEach(
            s => s.emit('players_update', {players: model.getNicknames(),
                                           drills: model.getDrills()})
        )
    })

    socket.on('error', function(err){
        var nick = model.removePlayer(socket)
        console.log(nick + ' crashed')
        model.getSockets().forEach(
            s => s.emit('players_update', {players: model.getNicknames(),
                                           drills: model.getDrills()})
        )
    })

    socket.on('ready', function(data) {
        var team = model.addPlayer(socket, data.name)
        model.getSockets().forEach(
            s => s.emit('players_update', {players: model.getNicknames(),
                                           drills: model.getDrills()})
        )

        socket.emit('start', {team: team,
                              cube: model.getSerializedCube(),
                              scores: model.getScores()})
        console.log(data.name + ' is ready')
    })

    socket.on('fire', function(data){
        console.log('fire received')
        if ( model.addFire(socket, data) ) {
            console.log('resolving fires...')
            var histories = model.resolveFires()
            console.log('sending result to client...')
            model.getSockets().forEach(
                s => s.emit('new_turn', {
                                fires_history: histories[0],
                                cube_history: histories[1],
                                players: model.getNicknames(),
                                drills: model.getDrills(),
                                scores: model.getScores()
                            })
            )
            console.log('done')
        }
    })
})
