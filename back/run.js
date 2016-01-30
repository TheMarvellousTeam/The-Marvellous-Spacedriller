require('./staticServer')

import {Cube} from '../common/cube'
import {StateMachine} from './src/state'

var io = require('socket.io')(1984)

var cube = (new Cube()).generate( 10 )
var state = new StateMachine()
var user_socket = []
var user_nick = []

var tmp_team = 0

var startGame = function(){
    console.log('start game !')
    state.start()

    user_socket.forEach((s) => {
        s.emit( 'start',
                {
                    team: tmp_team++%2,
                    cube: cube.serialize()
                })
    })
}

io.on('connection', function(socket){
	console.log('user connected')

    socket.on('disconnect', function(){
        var i = user_socket.indexOf(socket)
        user_socket.splice(i, 1)
        var nick = user_nick.splice(i, 1)

        console.log(nick + ' disconnected')
    })

    socket.on('error', function(err){
        var i = user_socket.indexOf(socket)
        user_socket.splice(i, 1)
        var nick = user_nick.splice(i, 1)

        console.log(nick + ' crashed')
    })

    socket.on('ready', function(data) {
        for(var i = user_socket.length; i--;) {
            user_socket[i].emit('new_player', {name: data.name})
            socket.emit('new_player', {name: user_nick[i]})
        }

        user_socket.push(socket)
        user_nick.push(data.name)

        console.log(data.name + ' is ready')
        if ( !state.isStarted() && user_socket.length >= 2 ){
            startGame()
        } else if ( state.isStarted() ){
            socket.emit('start',
                        {
                            team: tmp_team++%2,
                            cube: cube.serialize()
                        })
        }
    })

    socket.on('fire', function(data){
        state.newFire()
        if ( state.isFireOver(user_socket.length) ) {
            // resolve all fires
            // send new turn
        }
    })
})
