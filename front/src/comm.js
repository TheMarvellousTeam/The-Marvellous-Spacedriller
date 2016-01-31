import {Cube} from '../../common/cube'
import {GemBag} from '../../common/gemBag'
import {init as initView, updatePlayers, updateScores} from './view'
import {eventBus} from '../../common/eventBus'

const io = require('socket.io-client')

var socket = null

export var init = function() {
    socket = io.connect(location.origin+':1984')
    socket.on('start', function(data){
        initView( (new Cube()).hydrate(data.cube), new GemBag )
        document.getElementById('team').innerHTML= "You're in team"+data.team
        updateScores(data.scores)
        eventBus.emit('authorize_fire')
    })

    socket.on('players_update', function(data){
        updatePlayers(data.players, data.drills)
    })

    socket.on('new_turn', function(data){
        for(var i=0; i<data.cube_history.length; i++){
            const o = data.fires_history[i].origin
            const e = data.fires_history[i].end
            const serial = data.cube_history[i]
            setTimeout(function(){
                eventBus.emit('render_fire', {
                    start: o,
                    end: e,
                    time: 1500,
                    cube: serial
                })
            }, 1500 * i)
        }

        updatePlayers(data.players, data.drills)
        updateScores(data.scores)

        eventBus.emit('authorize_fire')
    })
}

export var sendReady = function(nickname){
    socket.emit('ready', {name: nickname})
}

export var sendFire = function(origin, v) {
    socket.emit('fire', {
        origin: origin,
        v: v
    })
}
