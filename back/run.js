require('./staticServer')

import {Cube} from '../common/cube'
import {StateMachine} from './src/state'

var io = require('socket.io')(1984)

const MIN_PLAYER = 1

var cube = (new Cube()).generate( 10 )
var gameState = new StateMachine()

var user_socket = []
var user_nick = []

var team_zero = []
var team_one = []

var tmp_team = 0

var affectTeam = function(socket) {
    var team = -1
    if ( team_zero.length < team_one.length ){
        team = 0
    } else if ( team_zero.length > team_one.length ) {
        team = 1
    } else {
        team = Math.floor(Math.random()*2)
    }

    if (team == 0) {
        team_zero.push(socket)
    } else if (team == 1) {
        team_one.push(socket)
    }
    return team
}


io.on('connection', function(socket){
	console.log('user connected')

    socket.on('disconnect', function(){
        var i = user_socket.indexOf(socket)
        user_socket.splice(i, 1)
        var nick = user_nick.splice(i, 1)

        user_socket.forEach(s => s.emit('players_update', {players: user_nick}))

        console.log(nick + ' disconnected')
    })

    socket.on('error', function(err){
        var i = user_socket.indexOf(socket)
        user_socket.splice(i, 1)
        var nick = user_nick.splice(i, 1)

        user_socket.forEach(s => s.emit('players_update', {players: user_nick}))

        console.log(nick + ' crashed')
    })

    socket.on('ready', function(data) {
        user_socket.push(socket)
        user_nick.push(data.name)

        user_socket.forEach(s => s.emit('players_update', {players: user_nick}))

        console.log(data.name + ' is ready')

        if ( gameState.isStarted() ){
            var team = affectTeam(socket)
            socket.emit('start', {team: team,
                                  cube: cube.serialize()})
        } else if ( user_socket.length >= MIN_PLAYER ){
            gameState.start()
            for ( var i = user_socket.length; i-- ;){
                var team = affectTeam(user_socket[i])
                user_socket[i].emit('start', {team: team,
                                              cube: cube.serialize()})
            }

        }
    })

    socket.on('fire', function(data){
        gameState.newFire()
        if ( gameState.isFireOver(user_socket.length) ) {
            // resolve all fires
            // send new turn
        }
    })
})
