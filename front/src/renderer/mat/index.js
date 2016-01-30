import THREE from 'three'
import {textures} from './texture'


const color = {
    'a': 0x193209,
    'b': 0xA029D9,
    'c': 0xD009D9,
    'd': 0xA1298B,
}
const tex = {
    'a': 'rock',
    'b': 'rock',
    'c': 'rock',
    'd': 'soft rock',
}
export const cube = ( cell ) =>
    new THREE.MeshPhongMaterial( {
        map         : textures[ tex[ cell ] ],
        shininess   : 1,
        specular    : 0xFF00FF,
        // transparent : true,
        // opacity     : 0.5,
    })

export const gizmo = () =>
    new THREE.MeshPhongMaterial( {
        wireframe: true,
        color: 0x33AA33,
        shininess : 12,
        specular: 0xFFFFFF,
    })
