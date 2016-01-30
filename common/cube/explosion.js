import { Cube as Parent } from './generate'

const t = ( o,v,l, attr ) => {

    if ( v[attr] == 0 )
        return {a: -Infinity, b: Infinity}

    const u = ( -l - o[attr] ) / v[ attr ]
    const k = (  l - o[attr] ) / v[ attr ]

    return {a: Math.min(u,k), b: Math.max(u,k)}
}

const timeToBigSquare = ( o,v,l ) => {
    const i = [
        t( o,v,l, 'x' ),
        t( o,v,l, 'y' ),
        t( o,v,l, 'z' ),
    ]
        .reduce( (u, i) => ({

            a   : Math.max( u.a, i.a ),
            b   : Math.min( u.b, i.b ),

        }), {a: -Infinity, b: Infinity})

    return i.a < i.b && i.a
}

export class Cube extends Parent {

    rayCast( o, v ){

        const l = this.getL()/2

        const t = timeToBigSquare( o,v,l )

        if ( !t )
            return

        const p = {
            x: o.x + v.x * (t+0.01),
            y: o.y + v.y * (t+0.01),
            z: o.z + v.z * (t+0.01),
        }

        const cell = this.contained( p )


        return {
            cell,
            t
        }
    }

    contained( p ){

        return {
            x   : this.getL()/2 + Math.floor( p.x ),
            y   : this.getL()/2 + Math.floor( p.y ),
            z   : this.getL()/2 + Math.floor( p.z ),
        }
        return {
            x   : this.getL()/2 -1 + Math.floor( Math.abs( p.x ) ) * ( p.x > 0 ? 1 : -1 ),
            y   : this.getL()/2 -1 + Math.floor( Math.abs( p.y ) ) * ( p.y > 0 ? 1 : -1 ),
            z   : this.getL()/2 -1 + Math.floor( Math.abs( p.z ) ) * ( p.z > 0 ? 1 : -1 ),
        }
    }

}
