import {Vector3} from 'three'

export const proj = ( camera, x, y ) => {

    const U = new Vector3( x*2-1, (1-y)*2-1, camera.near )

    U.unproject( camera )

    const v = U.sub( camera.position )
    v.normalize()

    return {
        origin  : camera.position.clone(),
        v       : v
    }
}
