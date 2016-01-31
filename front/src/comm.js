import {Cube} from '../../common/cube'
import {GemBag} from '../../common/gemBag'
import {init as initView, updatePlayers, updateScores} from './view'
import {eventBus} from '../../common/eventBus'

const io = require('socket.io-client')

var socket = null

const imgUrlA = require('file?[hash].[ext]!./asset/texture/gemA.png')
const imgUrlB = require('file?[hash].[ext]!./asset/texture/gemB.png')

export var init = function() {
    socket = io.connect(location.origin+':1984')
    socket.on('start', function(data){
        var bag = new GemBag()
        for(var i = 0; i<data.gems[0].length; i++){
            bag.add(data.gems[0][i], data.gems[1][i])
        }
        initView( (new Cube()).hydrate(data.cube), bag )

        document.getElementById('team').style.backgroundImage = `url(${ data.team == 0 ? imgUrlA : imgUrlB  })`

        updateScores(data.scores)
        eventBus.emit('authorize_fire')
    })

    socket.on('players_update', function(data){
        updatePlayers(data.players, data.drills, data.colors)
    })

    socket.on('new_turn', function(data){
        for(var i=0; i<data.cube_history.length; i++){
            const o = data.fires_history[i].origin
            const e = data.fires_history[i].end
            const hit = data.fires_history[i].hit
            const serial = data.cube_history[i]
            const color = data.fires_history[i].color
            setTimeout(function(){
                console.log('emit render_fire')
                eventBus.emit('render_fire', {
                    start: o,
                    end: e,
                    time: 1500,
                    cube: serial,
                    hit: hit,
                    color: color
                })
            }, 1500 * i)
        }

        updatePlayers(data.players, data.drills, data.colors)
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
