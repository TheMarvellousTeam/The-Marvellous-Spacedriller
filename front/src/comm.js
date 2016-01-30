import {Cube} from '../../common/cube'
import {init} from './view'
import {proj} from './renderer/utils/proj'

const io = require('socket.io-client')

var socket = null

export var initComm = function() {
    socket = io.connect(location.origin+':1984')
    socket.on('start', function(data){

        const cube = ( new Cube ).hydrate( data.cube )

        init( cube )

        document.getElementById('team').innerHTML= "You're in team "+data.team
    })

    socket.on('players_update', function(data){
        var players = document.getElementById('players')
        while( players.children.length ){
            players.removeChild(players.children[0])
        }
        for(var i=data.players.length; i-- ;){
            var div = document.createElement('div')
            div.innerHTML = data.players[i]
            players.appendChild(div)
        }
    })

    socket.on('new_turn', function(data){
        renderer.getCube().hydrate(data.cube)
    })
}

export var sendReady = function(nickname){
    socket.emit('ready', {name: nickname})
}

export var sendFire = function(origin, v, drill, radius) {
    socket.emit('fire', {
        origin: origin,
        v: v,
        drill: drill,
        radius: radius
    })
}