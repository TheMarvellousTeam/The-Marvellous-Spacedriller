import THREE from 'three'

const color = {
    'c': 0xD009D9,
}
export const cube = ( cell ) =>
    new THREE.MeshPhongMaterial( {
        color: color[ cell ],
        shininess : 12,
        specular: 0xFF00FF,
    })
