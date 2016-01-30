import {Cube} from '../../common/cube'

export class BackModel {
    constructor() {
        this._sockets = []
        this._nicknames = []

        this._team_zero = []
        this._team_one = []

        this._fires = []

        this._cube = (new Cube()).generate(10)
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
        var i = this._sockets.indexOf(socket)
        this._sockets.splice(i, 1)
        return this._nicknames.splice(i, 1)
    }

    addPlayer(socket, nickname) {
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
            this._team_zero.push(socket)

        if ( team == 1 )
            this._team_one.push(socket)

        return team
    }

    addFire(data) {
        this._fires.push(data)
        return this._fires.length == this._sockets.length
    }

    resolveFires() {
        //TODO
    }

}