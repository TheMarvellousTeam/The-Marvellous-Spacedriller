import THREE, {Vector3} from 'three'
import {cube as cube_mat} from '../mat'

export class CubeRenderer {

    constructor(){
        this._object3D = new THREE.Object3D()
    }

    setCube( cube ) {

        this._cube = cube

        return this
    }

    getCube() {
        return this._cube
    }

    setDepth( depth ){

        this._depthMax = depth

        return this
    }

    getObject(){
        return this._object3D
    }

    render( ) {

        const geometry = new THREE.BoxGeometry( 1, 1, 1 )

        const l = this._cube.getL()

        const o = this._object3D

        o.remove( ...o.children )

        for( let x = l; x--; )
        for( let y = l; y--; )
        for( let z = l; z--; )
        {
            if ( this._cube.getCellDepth(x, y, z) < this._depthMax ) {

                const cell = this._cube.getCell( x, y, z)

                if ( cell ){

                    const c = new THREE.Mesh( geometry, cube_mat( cell ) )

                    c.position.set(x-l/2+0.5, y-l/2+0.5, z-l/2+0.5)
                    o.add( c )

                }

            }
        }

        return this
    }

}
