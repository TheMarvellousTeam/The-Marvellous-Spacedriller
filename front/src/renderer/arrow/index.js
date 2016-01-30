import THREE, {Vector3} from 'three'
import {gizmo as gizmo_mat} from '../mat'

export const arrow = ( A, B ) => {

    const AB = (new Vector3 ).subVectors( B, A )
    const l  = AB.length()

    return new THREE.ArrowHelper( AB.normalize(), A, l, 0x33AE33 )
}
