import {Cube} from '../../common/cube'
import {randomDrill} from '../../common/drill'

const EXPLOSION_RADIUS = 2.5
const COLORS = [
    '#3C25CF',  // red
    '#CF2563',  // green
    '#13CF38',  // green
    '#C813CF',  // green
    '#F0EC29',  // green
    '#FF00D4',  // purple
    '#F2CC0D',  // yellow
    '#F2800D',  // orange
    '#0DF2CC'   // cyan
]
var colorsIndex = 0

export class BackModel {
    constructor(cube_size) {
        this._sockets_id = []
        this._sockets = []
        this._nicknames = []
        this._drills = []
        this._colors = []

        this._team_zero = []
        this._team_one = []

        this._fires = {}
        this._gems_zero = []
        this._gems_one = []
        for(var i=0; i<5; i++){
            this._gems_zero.push({
                x: Math.floor(Math.random()*cube_size),
                y: Math.floor(Math.random()*cube_size),
                z: Math.floor(Math.random()*cube_size)
            })
            this._gems_one.push({
                x: Math.floor(Math.random()*cube_size),
                y: Math.floor(Math.random()*cube_size),
                z: Math.floor(Math.random()*cube_size)
            })
        }

        this._score_zero = 0
        this._score_one = 0

        this._cube = (new Cube()).generate(cube_size)
    }

    getRandomGem() {
        var positions = []
        var gemTypes = []
        if( Math.random() < 0.5 ) {
            positions.push(this._gems_zero[Math.floor(Math.random()*this._gems_zero.length)])
            gemTypes.push('gemA')
        } else {
            positions.push(this._gems_one[Math.floor(Math.random()*this._gems_one.length)])
            gemTypes.push('gemB')
        }

        if( Math.random() < 0.5 ) {
            positions.push(this._gems_zero[Math.floor(Math.random()*this._gems_zero.length)])
            gemTypes.push('gemA')
        } else {
            positions.push(this._gems_one[Math.floor(Math.random()*this._gems_one.length)])
            gemTypes.push('gemB')
        }
        return [positions, gemTypes]
    }

    getNicknames() {
        return this._nicknames
    }

    getScores() {
        return [this._score_zero, this._score_one]
    }

    getSockets() {
        return this._sockets
    }

    getDrills() {
        return this._drills
    }

    getColors() {
        return this._colors
    }

    getSerializedCube() {
        return this._cube.serialize()
    }

    removePlayer(socket) {
        var i = this._sockets_id.indexOf(socket.id)
        this._sockets_id.splice(i, 1)
        this._sockets.splice(i, 1)
        this._drills.splice(i, 1)
        this._colors.splice(i, 1)
        return this._nicknames.splice(i, 1)
    }

    addPlayer(socket, nickname) {
        this._sockets_id.push(socket.id)
        this._sockets.push(socket)
        this._nicknames.push(nickname)
        this._drills.push(randomDrill())
        this._colors.push(COLORS[colorsIndex])
        colorsIndex = (colorsIndex + 1) % COLORS.length
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
            var sid = this._sockets[i].id
            var fire = this._fires[sid]
            var res = this._cube.explosion( fire.origin, fire.v, this._drills[i], EXPLOSION_RADIUS )
            fire.color = this._colors[i]
            if( res ) {
                fire.end = res.p
                fire.hit = true
                // check gems
                var k = 0
                var newList = []
                while( k < this._gems_zero.length ){
                    var gem = this._gems_zero[k]
                    console.log('check: '+this._cube.getCell(gem.x, gem.y, gem.z))
                    if( !this._cube.getCell(gem.x, gem.y, gem.z) ){
                        this._score_zero++
                    } else {
                        newList.push(this._gems_zero[k])    
                    }
                    k++
                }
                this._gems_zero = newList

                k = 0
                newList = []
                while( k < this._gems_one.length ){
                    var gem = this._gems_one[k]
                    console.log('check: '+this._cube.getCell(gem.x, gem.y, gem.z))
                    if( !this._cube.getCell(gem.x, gem.y, gem.z) ){
                        this._score_one++
                    } else {
                        newList.push(this._gems_one[k])
                    }
                    k++
                }
                this._gems_one = newList
            } else {
                fire.hit = false
                fire.end = {
                    x: fire.origin.x + fire.v.x * 300,
                    y: fire.origin.y + fire.v.y * 300,
                    z: fire.origin.z + fire.v.z * 300
                }
            }
            fires_history.push(fire)
            cube_history.push(this._cube.serialize())
        }


        console.log("done")

        // shift initiatives + miscellanious
        this._sockets_id.push(this._sockets_id.shift())
        this._sockets.push(this._sockets.shift())
        this._nicknames.push(this._nicknames.shift())
        this._colors.push(this._colors.shift())
        for(var i =this._drills.length; i-- ;){
            this._drills[i] = randomDrill()
        }
        this._fires = {}
        return [fires_history, cube_history]
    }

}
