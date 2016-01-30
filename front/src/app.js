import {Cube} from '../../common/cube'
import {init} from './view'
const io = require('socket.io-client')



require('file?name=index.html!./app.html')


window.onload = () => {


    var socket = io.connect('http://localhost:1984')
    socket.on('start', function(data){

        const cube = ( new Cube ).hydrate( data.cube )

        init( cube )
    })

    socket.on('new_player', function(data){
        console.log('chouette')
        var div = document.createElement('div')
        div.innerHTML = data.name
        document.getElementById('players').appendChild(div)
    })

    var input_name = document.createElement('input')
    input_name.setAttribute('type', 'text')
    input_name.setAttribute('value', 'enter a nickname')
    var go = document.createElement('button')
    document.body.appendChild(input_name)
    document.body.appendChild(go)
    go.onclick = function(){
        socket.emit('ready', {name: input_name.value})
        document.body.removeChild(input_name)
        document.body.removeChild(go)
    }

    
}
