import THREE, {Vector3} from 'three'
import {cubeSize} from '../../../../common/params'

const url = [
    require('file?[hash].[ext]!../../asset/texture/envmap/cubemap1.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/cubemap2.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/cubemap3.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/cubemap5.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/cubemap4.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/cubemap6.jpg'),
]

export const init = ( scene ) =>
    new Promise( resolve => {

        const textureCube = THREE.ImageUtils.loadTextureCube( url )
        textureCube.format = THREE.RGBFormat
        textureCube.mapping = THREE.CubeReflectionMapping


        const cubeShader = THREE.ShaderLib[ "cube" ];
        const cubeMaterial = new THREE.ShaderMaterial( {
            fragmentShader: cubeShader.fragmentShader,
            vertexShader: cubeShader.vertexShader,
            uniforms: cubeShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        } )

        cubeMaterial.uniforms[ "tCube" ].value = textureCube

        const cubeMesh = new THREE.Mesh( new THREE.BoxGeometry( cubeSize * 40, cubeSize * 40, cubeSize * 40 ), cubeMaterial )
        scene.add( cubeMesh )


    })
