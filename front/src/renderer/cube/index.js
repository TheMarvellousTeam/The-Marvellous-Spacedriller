import THREE, {Vector3} from 'three'
import {cube as cube_mat} from '../mat'
import {buildFrontier} from './buildFrontier'

export class CubeRenderer {

    constructor(){
        this._object3D  = new THREE.Object3D()
        this._phase     = 'explorer'
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

    setPhase( phase ){

        this._phase = phase

        return this
    }

    getObject(){
        return this._object3D
    }

    render( ) {

        const o = this._object3D

        o.remove( ...o.children )

        const cellType = [
            'a',
            'b',
            'c',
            'd',
        ]

        const l = this._cube.getL()
        const depthMax = this._phase == 'explorer' ? this._depthMax : Infinity
        const ghost = depthMax < l && buildFrontier( this._cube, cellType )

        const hard = buildFrontier( this._cube, cellType, depthMax )

        Object.keys( hard )
            .forEach( cell => {

                const g = hard[ cell ]

                // const mesh = new THREE.Mesh( g, cube_mat( cell, this._phase == 'explorer' ? 0.9 : 1 ) )
                const mesh = new THREE.Mesh( g, cube_mat( cell,  1 ) )
                o.add( mesh )
            })

        1 && ghost && Object.keys( ghost )
            .forEach( cell => {

                const g = ghost[ cell ]

                const mesh = new THREE.Mesh( g, cube_mat( cell, 0.2 ) )
                o.add( mesh )
            })

        return this
    }

}
