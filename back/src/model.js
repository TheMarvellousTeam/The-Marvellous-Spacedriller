import {Cube} from '../../common/cube'

export class BackModel {
    constructor(cube_size) {
        this._sockets_id = []
        this._sockets = []
        this._nicknames = []

        this._team_zero = []
        this._team_one = []

        this._fires = {}

        this._cube = (new Cube()).generate(cube_size)
    }

    getNicknames() {
        return this._nicknames
    }

    getSockets() {
        return this._sockets
    }

    getSerializedCube() {
        return this._cube.serialize()
    }

    removePlayer(socket) {
        var i = this._sockets_id.indexOf(socket.id)
        this._sockets_id.splice(i, 1)
        this._sockets.splice(i, 1)
        return this._nicknames.splice(i, 1)
    }

    addPlayer(socket, nickname) {
        this._sockets_id.push(socket.id)
        this._sockets.push(socket)
        this._nicknames.push(nickname)
        return this._affectTeam(socket)
    }

    _affectTeam(socket) {
        var team = -1
        if ( this._team_zero.length < this._team_one.length ){
            team = 0
        } else if ( this._team_zero.length > this._team_one.length ) {
            team = 1
        } else {
            team = Math.floor(Math.random()*2)
        }

        if ( team == 0)
            this._team_zero.push(socket.id)

        if ( team == 1 )
            this._team_one.push(socket.id)

        return team
    }

    addFire(socket, data) {
        this._fires[socket.id] = data
        return Object.keys(this._fires).length == this._sockets.length
    }

    resolveFires() {
        var cube_history = []
        var fires_history = []

        //crash cube
        console.log("compute explosion...")
        for ( var i = 0 ; i < this._sockets.length; i++){
            var fire = this._fires[this._sockets[i].id]
            fires_history.push(fire)
            this._cube.explosion( fire.origin, fire.v, 'd', 1.2 )
            cube_history.push(this._cube.serialize())
        }

        //TODO extract gems

        console.log("done")
        // shift initiatives
        this._sockets_id.push(this._sockets_id.shift())
        this._sockets.push(this._sockets.shift())
        this._nicknames.push(this._nicknames.shift())

        this._fires = {}
        return [fires_history, cube_history]
    }

}
