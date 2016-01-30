import { Cube as Parent } from './serialize'

const letter = [
    'a',
    'b',
    'c',
    'd',
]
const strate = Array.apply( null, new Array(128) ).map( _ => letter[ 0 | ( Math.random() * 4.99 ) ] )

export class Cube extends Parent {

    generate( l ) {
        this._l = l
        this._cube = Array.apply( null, new Array(l*l*l) )
            .map( (_, i) => {

                const x = i % l
                const y = 0|( i /l ) % l
                const z = 0|( i /(l*l) ) % l

                let depth = this.getCellDepth( x,y,z )

                // depth = depth + (0|( Math.random() * 1.5 ))
                // depth = Math.min( l/2-1, depth )
                // depth = Math.max( 0, depth )

                return 'd'
                return strate[ depth ]
            })

        return this
    }
}
