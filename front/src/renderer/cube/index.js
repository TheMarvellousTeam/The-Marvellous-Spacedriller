import THREE, {Vector3} from 'three'
import {cube as cube_mat} from '../mat'

const for_direction = ( cube, x,y,z,  l, v ) => {

    if ( !cube.isInside( x + v.x, y + v.y, z + v.z ) || !cube.getCell( x + v.x, y + v.y, z + v.z ) ) {

        if ( v.x == 1)
            return [
                new Vector3( x + 1 - l/2, y     - l/2, z    - l/2),
                new Vector3( x + 1 - l/2, y + 1 - l/2, z    - l/2),
                new Vector3( x + 1 - l/2, y + 1 - l/2, z +1 - l/2),
                new Vector3( x + 1 - l/2, y     - l/2, z +1 - l/2),
            ]

        if ( v.x == -1)
            return [
                new Vector3( x     - l/2, y + 1 - l/2, z +1 - l/2),
                new Vector3( x     - l/2, y + 1 - l/2, z    - l/2),
                new Vector3( x     - l/2, y     - l/2, z    - l/2),
                new Vector3( x     - l/2, y     - l/2, z +1 - l/2),
            ]

        if ( v.y == 1)
            return [
                new Vector3( x + 1 - l/2, y + 1 - l/2, z +1 - l/2),
                new Vector3( x + 1 - l/2, y + 1 - l/2, z    - l/2),
                new Vector3( x     - l/2, y + 1 - l/2, z    - l/2),
                new Vector3( x     - l/2, y + 1 - l/2, z +1 - l/2),
            ]

        if ( v.y == -1)
            return [
                new Vector3( x      - l/2, y    - l/2, z +1 - l/2),
                new Vector3( x      - l/2, y    - l/2, z    - l/2),
                new Vector3( x  + 1 - l/2, y    - l/2, z    - l/2),
                new Vector3( x  + 1 - l/2, y    - l/2, z +1 - l/2),
            ]

        if ( v.z == 1)
            return [
                new Vector3( x     - l/2, y - l/2 +1 , z - l/2  + 1),
                new Vector3( x     - l/2, y - l/2    , z - l/2  + 1),
                new Vector3( x + 1 - l/2, y - l/2    , z - l/2  + 1),
                new Vector3( x + 1 - l/2, y - l/2 +1 , z - l/2  + 1),
            ]

        if ( v.z == -1)
            return [
                new Vector3( x  + 1 - l/2, y +1 - l/2, z - l/2),
                new Vector3( x  + 1 - l/2, y    - l/2, z - l/2),
                new Vector3( x      - l/2, y    - l/2, z - l/2),
                new Vector3( x      - l/2, y +1 - l/2, z - l/2),
            ]
    }

    return []
}

export class CubeRenderer {

    constructor(){
        this._object3D = new THREE.Object3D()
    }

    setCube( cube ) {

        this._cube = cube

        return this
    }

    setDepth( depth ){

        this._depthMax = depth

        return this
    }

    getObject(){
        return this._object3D
    }

    render( ) {

        const l = this._cube.getL()

        const o = this._object3D

        o.remove( ...o.children )

        // for each cell type

        const geom = {}
        ;[
            'a',
            'b',
            'c',
            'd',
        ]
            .forEach( cell =>

                geom[ cell ] = new THREE.Geometry()

            )

        for( let x = l; x--; )
        for( let y = l; y--; )
        for( let z = l; z--; )
        {
            if ( this._cube.getCellDepth(x, y, z) < this._depthMax ) {

                const cell = this._cube.getCell( x, y, z)

                if ( cell ){

                    const { vertices, faces } = geom[ cell ]

                    const v = [
                        ...for_direction( this._cube, x, y, z,  l, {x: 1 , y: 0 , z: 0} ),
                        ...for_direction( this._cube, x, y, z,  l, {x:-1 , y: 0 , z: 0} ),
                        ...for_direction( this._cube, x, y, z,  l, {x: 0 , y: 1 , z: 0} ),
                        ...for_direction( this._cube, x, y, z,  l, {x: 0 , y:-1 , z: 0} ),
                        ...for_direction( this._cube, x, y, z,  l, {x: 0 , y: 0 , z: 1} ),
                        ...for_direction( this._cube, x, y, z,  l, {x: 0 , y: 0 , z:-1} ),
                    ]


                    for ( let i = 0; i<v.length/4; i ++ ){
                        faces.push(
                            new THREE.Face3( i*4 + vertices.length  , i*4 + vertices.length+1, i*4 + vertices.length+2 ),
                            new THREE.Face3( i*4 + vertices.length+3, i*4 + vertices.length  , i*4 + vertices.length+2 )
                        )
                    }

                    vertices.push( ...v )

                }
            }
        }

        Object.keys( geom )
            .forEach( cell => {

                const g = geom[ cell ]

                if ( g.vertices.length == 0 )
                    return

                g.verticesNeedUpdate = true
                g.elementsNeedUpdate = true
                g.normalsNeedUpdate = true
                g.buffersNeedUpdate = true
                g.uvsNeedUpdate = true

                g.computeFaceNormals()

                o.add( new THREE.Mesh( g, cube_mat( cell ) ) )
            })

        return this
    }

}
