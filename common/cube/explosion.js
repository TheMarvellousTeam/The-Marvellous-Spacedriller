import { Cube as Parent } from './raycaster'

const closestCorner = ( x,y,z, p ) => {
    return true
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

            const d = closestCorner( cell.x, cell.y, cell.z )

            if ( cellType == drillType && closestCorner( cell.x, cell.y, cell.z ) < squareRadius )

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
