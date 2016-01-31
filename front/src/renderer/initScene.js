import THREE, {Vector3} from 'three'
const OrbitControls = require('three-orbit-controls')(THREE)
import {default as Stats} from 'stats.js'
import {init as initEnvMap } from './envmap'
import {init as initLight } from './light'


const material = new THREE.MeshPhongMaterial( {
    color: 0xD009D9,
    shininess : 12,
    specular: 0xFF00FF,
})

export const initScene = () => {

    const stats = new Stats()
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.right = '0px'
    stats.domElement.style.bottom = '0px'
    document.body.appendChild( stats.domElement )

    let camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 2000 )
	camera.position.set(0, 0 , 70)
    camera.lookAt( new Vector3(0,0,0) )
    camera.updateProjectionMatrix ()


	let scene = new THREE.Scene()

    // gizmo
    // let geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 )
    // let gizmo = new THREE.Mesh( geometry, material )
    // gizmo.name='gizmo'
    // scene.add( gizmo )
    // gizmo.position.set(0,0,0)

	// renderer

	let renderer = new THREE.WebGLRenderer( )
	renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    // renderer.shadowMap.enabled = true
	// renderer.shadowMap.type = THREE.PCFShadowMap
    // renderer.shadowMapSoft = false;
    // renderer.shadowMapCullFrontFaces = true;

    document.body.appendChild(renderer.domElement)


    let controls = new OrbitControls( camera , renderer.domElement )
    controls.noZoom = true
    controls.addEventListener( 'change', () => 0 )

    initLight( scene )
    initEnvMap( scene )

    const loop = () => {
        stats.begin()
        renderer.render( scene, camera )
        stats.end()

        requestAnimationFrame( loop )
    }
    loop()

    renderer.render(scene, camera)

    return {camera, scene, renderer}
}
