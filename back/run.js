require('./staticServer')

import {Cube} from '../common/cube'
const size_cube = 10

var io = require('socket.io')(1984)

var users = []
var nb_users = 0

var startGame = function(){
    console.log('start game !')
    var tmp = 0
    var cube = (new Cube()).generate( size_cube )

    users.forEach((user) => {
        user.emit('start',
                  {
                    team: tmp++%2,
                    cube: cube.serialize()
                  }
                 )
    })
}

io.on('connection', function(socket){
	console.log('user connected')
    nb_users++

    socket.on('disconnect', function(){
        console.log('user disconnected')
        users.splice(users.indexOf(socket), 1)
        nb_users--
    })

    socket.on('ready', function() {
        users.push(socket)
        console.log('someone is ready !')
        if ( nb_users >= 1 && users.length == nb_users ){
            startGame()
        }
    })

    socket.on('fire', function(data){

    })
})
