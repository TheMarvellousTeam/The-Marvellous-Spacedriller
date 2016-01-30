import { Cube as Parent } from './raycaster'

const closestCorner_attr = ( v, u, l ) => {
    const a = v - l/2
    const b = v - l/2 + 1

    if ( a <= u && u <= b )
        return u

    if ( u < a )
        return a

    if ( u > b )
        return b
}
const closestCorner = ( x,y,z, l, p ) => {
    const cx = closestCorner_attr( x, p.x, l, 'x' ) - p.x
    const cy = closestCorner_attr( y, p.y, l, 'y' ) - p.y
    const cz = closestCorner_attr( z, p.z, l, 'z' ) - p.z

    return cx*cx + cy*cy + cz*cz
}

export class Cube extends Parent {

    blast( p, blastRadius, drillType ){

        const squareRadius = blastRadius * blastRadius

        for ( let x = -blastRadius; x < blastRadius; x ++ )
        for ( let y = -blastRadius; y < blastRadius; y ++ )
        for ( let z = -blastRadius; z < blastRadius; z ++ )
        {

            const u = {
                x: p.x + x,
                y: p.y + y,
                z: p.z + z,
            }

            const cell = this.contained( u )

            const cellType = this.isInside( cell.x, cell.y, cell.z ) && this.getCell( cell.x, cell.y, cell.z )

            if ( cellType == drillType && closestCorner( cell.x, cell.y, cell.z  , this.getL(), p ) < squareRadius )

                    this.setCell( cell.x, cell.y, cell.z, null )

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
