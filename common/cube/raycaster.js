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
            p,
            t
        }
    }

    contained( p ){

        return {
            x   : this.getL()/2 + Math.floor( p.x ),
            y   : this.getL()/2 + Math.floor( p.y ),
            z   : this.getL()/2 + Math.floor( p.z ),
        }
    }

    blast( p, blastRadius, drillType ){

        const squareRadius = blastRadius * blastRadius

        for ( let x = -blastRadius; x < blastRadius; x ++ )
        for ( let y = -blastRadius; y < blastRadius; y ++ )
        for ( let z = -blastRadius; z < blastRadius; z ++ )
        {

            const d = x*x + y*y + z*z

            if ( d <= squareRadius ) {

                const u = {
                    x: p.x + x,
                    y: p.y + y,
                    z: p.z + z,
                }

                const cell = this.contained( u )

                const cellType = this.isInside( cell.x, cell.y, cell.z ) && this.getCell( cell.x, cell.y, cell.z )

                if ( cellType == drillType )
                    this.setCell( cell.x, cell.y, cell.z, null )

            }
        }

        return this
    }

    explosion( o, v, drillType, blastRadius ){

        const res = this.rayCast( o, v )

        if ( !res )
            return

        this.blast( res.p, blastRadius, drillType )

        return res
    }

}
