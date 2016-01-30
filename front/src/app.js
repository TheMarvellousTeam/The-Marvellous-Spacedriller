import {Cube} from '../../common/cube'
import {init} from './view'
const io = require('socket.io-client')



require('file?name=index.html!./app.html')


window.onload = () => {


    var socket = io.connect('http://localhost:1984')
    socket.on('start', function(data){

        const cube = ( new Cube ).hydrate( data.cube )

        init( cube )

        document.getElementById('team').innerHTML= "You're in team "+data.team
    })

    socket.on('new_player', function(data){
        var div = document.createElement('div')
        div.innerHTML = data.name
        document.getElementById('players').appendChild(div)
    })

    socket.on('player_quit', function(data){
        var players = document.getElementById('players').children
        for (var i = players.length; i-- ;){
            if (players[i].innerHTML == data.name){
                document.getElementById('players').removeChild(players[i])
            }
        }
    })

    var input_name = document.createElement('input')
    input_name.setAttribute('type', 'text')
    input_name.setAttribute('value', 'nickname')
    document.body.appendChild(input_name)
    
    var go = document.createElement('input')
    go.setAttribute('type', 'button')
    go.setAttribute('value', 'go')
    go.onclick = function(){
        socket.emit('ready', {name: input_name.value})
        document.body.removeChild(input_name)
        document.body.removeChild(go)
    }
    document.body.appendChild(go)

    
}
