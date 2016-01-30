import { Cube as Parent } from './serialize'

const strate = ['a', 'b', 'c', 'c', 'd']

export class Cube extends Parent {

    generate( l ) {
        this._l = l
        this._cube = Array.apply( null, new Array(l*l*l) )
            .map( (_, i) => {

                const x = i % l
                const y = 0|( i /l ) % l
                const z = 0|( i /(l*l) ) % l

                let depth = this.getCellDepth( x,y,z )

                depth = depth + (0|( Math.random() * 1.5 )) * ( Math.random() > 0.5 ? 1 : -1 )
                depth = Math.min( l/2-1, depth )
                depth = Math.max( 0, depth )

                return strate[ depth ]
            })

        return this
    }
}
