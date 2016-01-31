import THREE, {Vector3} from 'three'

const for_direction = ( cube, x,y,z,  depthMax, v ) => {

    if ( !cube.isInside( x + v.x, y + v.y, z + v.z ) || !cube.getCell( x + v.x, y + v.y, z + v.z ) || cube.getCellDepth( x + v.x, y + v.y, z + v.z ) == depthMax ) {

        const l = cube.getL()

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

export const buildFrontier = ( cube, cellType, depthMax = Infinity ) => {

    const geom = {}
    cellType
        .forEach( cell => geom[ cell ] = new THREE.Geometry() )

    const l = cube.getL()

    for( let x = l; x--; )
    for( let y = l; y--; )
    for( let z = l; z--; )
    {
        if ( cube.getCellDepth(x, y, z) < depthMax ) {

            const cell = cube.getCell( x, y, z)

            if ( cell ){

                const { vertices, faces, faceVertexUvs } = geom[ cell ]

                const v = [
                    ...for_direction( cube, x, y, z,  depthMax, {x: 1 , y: 0 , z: 0} ),
                    ...for_direction( cube, x, y, z,  depthMax, {x:-1 , y: 0 , z: 0} ),
                    ...for_direction( cube, x, y, z,  depthMax, {x: 0 , y: 1 , z: 0} ),
                    ...for_direction( cube, x, y, z,  depthMax, {x: 0 , y:-1 , z: 0} ),
                    ...for_direction( cube, x, y, z,  depthMax, {x: 0 , y: 0 , z: 1} ),
                    ...for_direction( cube, x, y, z,  depthMax, {x: 0 , y: 0 , z:-1} ),
                ]


                for ( let i = 0; i<v.length/4; i ++ ){
                    faces.push(
                        new THREE.Face3( i*4 + vertices.length  , i*4 + vertices.length+1, i*4 + vertices.length+2 ),
                        new THREE.Face3( i*4 + vertices.length+3, i*4 + vertices.length  , i*4 + vertices.length+2 )
                    )
                    faceVertexUvs[0].push(
                        [
                            new THREE.Vector2( 0, 0 ),
                            new THREE.Vector2( 0, 1 ),
                            new THREE.Vector2( 1, 1 ),
                        ],
                        [
                            new THREE.Vector2( 1, 0 ),
                            new THREE.Vector2( 0, 0 ),
                            new THREE.Vector2( 0, 1 ),
                        ],
                    )
                }

                vertices.push( ...v )

            }
        }
    }

    Object.keys( geom )
        .forEach( cell => {

            const g = geom[ cell ]

            if ( g.vertices.length == 0 ) {
                delete geom[ cell ]
                return
            }

            g.verticesNeedUpdate    = true
            g.elementsNeedUpdate    = true
            g.normalsNeedUpdate     = true
            g.buffersNeedUpdate     = true
            g.uvsNeedUpdate         = true

            g.computeFaceNormals()

        })

    return geom
}
