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

    socket.emit('ready')
}
