import {Cube as Parent} from './base'

export class Cube extends Parent {

    serialize(){
        return this._cube.join('')
    }

    hydrate( c ){
        this._l = Math.round( Math.pow( c.length, 1/3 ) )
        this._cube = c.split()

        return this
    }
}
