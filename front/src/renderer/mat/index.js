import THREE from 'three'

const color = {
    'a': 0x193209,
    'b': 0xA029D9,
    'c': 0xD009D9,
    'd': 0xA1298B,
}
export const cube = ( cell ) =>
    new THREE.MeshPhongMaterial( {
        color: color[ cell ],
        shininess : 12,
        specular: 0xFF00FF,
    })

export const gizmo = () =>
    new THREE.MeshPhongMaterial( {
        color: 0x33AA33,
        shininess : 12,
        specular: 0xFFFFFF,
    })
