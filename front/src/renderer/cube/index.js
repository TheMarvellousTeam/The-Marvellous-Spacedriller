import THREE, {Vector3} from 'three'
import {cube as cube_mat} from '../mat'

export class CubeRenderer {

    setCube( cube ) {

        this._cube = cube

        return this
    }

    setDepth( ){

        return this
    }

    render( ) {

        const geometry = new THREE.BoxGeometry( 0.95, 0.95, 0.95 )

        const l = this._cube.getL()

        const o = new THREE.Object3D()

        for( let x = l; x--; )
        for( let y = l; y--; )
        for( let z = l; z--; )
        {

            const cell = this._cube.getCell( x, y, z)
            const c = new THREE.Mesh( geometry, cube_mat( cell ) )

            c.position.set(x-l/2,y-l/2,z-l/2)
            o.add( c )
        }

        return o
    }

}
