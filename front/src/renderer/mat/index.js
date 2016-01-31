import THREE from 'three'
import {textures} from './texture'


export const cube = ( cell, opacity ) =>
    new THREE.MeshPhongMaterial( {
        map         : textures[ cell ],
        shininess   : 0.5,
        specular    : 0xDDCCCFF,
        transparent : opacity < 1,
        depthWrite  : opacity == 1,
        opacity,
    })

export const gem = ( type ) =>
    new THREE.SpriteMaterial( {
        map         : textures[ type ],
    })


export const gizmo = () =>
    new THREE.MeshPhongMaterial( {
        wireframe: true,
        color: 0x33AA33,
        shininess : 12,
        specular: 0xFFFFFF,
    })
