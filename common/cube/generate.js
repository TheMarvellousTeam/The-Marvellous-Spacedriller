import { Cube as Parent } from './serialize'
import {minerals} from '../drill'

export class Cube extends Parent {

    generate( l ) {
        this._l = l
        this._cube = Array.apply( null, new Array(l*l*l) )
            .map( (_, i) => {

                const x = i % l
                const y = 0|( i /l ) % l
                const z = 0|( i /(l*l) ) % l

                let depth = this.getCellDepth( x,y,z )
                depth = Math.floor(depth*2/l*minerals.length)

                return minerals[]
            })

        return this
    }
}
