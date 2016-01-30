

export class Cube {

    constructor(){

        this._l = null
        this._cube = []
    }

    getCell( x, y, z ){
        return this._cube[ x * this._l*this._l + y * this._l + z  ]
    }

    setCell( x, y, z, cell ){
        this._cube[ x * this._l*this._l + y * this._l + z  ] = cell
        return this
    }

    isInside( x, y, z ){
        return x >= 0 && x < this._l
            && y >= 0 && y < this._l
            && z >= 0 && z < this._l
    }

    getCellDepth( x, y, z ){
        let depth = 0
        depth = Math.max( Math.abs( x - this._l/2 +0.5 ), depth )
        depth = Math.max( Math.abs( y - this._l/2 +0.5), depth )
        depth = Math.max( Math.abs( z - this._l/2 +0.5), depth )

        return Math.ceil( depth )
    }

    getL(){
        return this._l
    }
}
