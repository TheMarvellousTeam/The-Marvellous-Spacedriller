

export class Cube {

    constructor(){

        this._l = null
        this._cube = []
    }

    hydrate( c ){
        this._cube = c
    }

    getCell( x, y, z ){
        return this._cube[ x * this._l*this._l + y * this._l + z  ]
    }

    setCell( x, y, z, cell ){
        this._cube[ x * this._l*this._l + y * this._l + z  ] = cell
        return this
    }

    getL(){
        return this._l
    }
}
