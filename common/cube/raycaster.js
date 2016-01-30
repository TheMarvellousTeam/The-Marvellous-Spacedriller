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

const _exit_attr = ( o,v,t ) => {

    if ( v == 0 )
        return {
            t : Infinity,
        }

    const r = ( (o%1) + 1 ) % 1

    return {
        t : v < 0
            ? -( r == 0 ? 1 : r )/v
            : ( 1-r )/v
        ,

        v : v > 0 ? 1 : -1
    }
}

const _raycast = function( cell,o,v,t ) {

    const next = [
        { attr: 'x', ..._exit_attr( o.x, v.x, t ) },
        { attr: 'y', ..._exit_attr( o.y, v.y, t ) },
        { attr: 'z', ..._exit_attr( o.z, v.z, t ) },
    ]

    const r = next.sort( (a, b) => a.t > b.t ? 1 : -1 )[ 0 ]

    const nextO = {
        x : o.x + v.x * r.t,
        y : o.y + v.y * r.t,
        z : o.z + v.z * r.t,
    }
    cell[ r.attr ] += r.v

    if ( !this.isInside( cell.x, cell.y, cell.z ) )
        return

    if ( this.getCell( cell.x, cell.y, cell.z ) )
        return {
            t   : t,
            p   : nextO,
            cell
        }

    return _raycast.call( this, cell, nextO, v, r.t )
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

        if ( this.getCell( cell.x, cell.y, cell.z) )

            return {
                cell,
                p,
                t
            }

        else {

            const u = {
                x: o.x + v.x * t,
                y: o.y + v.y * t,
                z: o.z + v.z * t,
            }

            const res = _raycast.call( this, cell, u,v,0 )

            if ( res )
                return { ...res, t: res.t + t }

        }
    }

    contained( p ){

        return {
            x   : this.getL()/2 + Math.floor( p.x ),
            y   : this.getL()/2 + Math.floor( p.y ),
            z   : this.getL()/2 + Math.floor( p.z ),
        }
    }

}
