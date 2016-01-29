import { Cube as Parent } from './base'

export class Cube extends Parent {

    generate( l ) {
        this._l = l
        this._cube = Array.apply( null, new Array(l*l*l) )
            .map( _ => Math.random() > 0.5 ? 'c' : 'a' )

        return this
    }
}
