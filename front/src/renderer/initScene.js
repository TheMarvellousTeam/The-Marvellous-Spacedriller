import THREE, {Vector3} from 'three'
import {Stat} from 'stats.js'
const OrbitControls = require('three-orbit-controls')(THREE)

const material = new THREE.MeshPhongMaterial( {
    color: 0xD009D9,
    shininess : 12,
    specular: 0xFF00FF,
})

export const initScene = () => {
    let camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 2000 )
	camera.position.set(1, 1 , 3)
    camera.lookAt( new Vector3(0,0,0) )
    camera.updateProjectionMatrix ()


	let scene = new THREE.Scene()

    // gizmo
    let geometry = new THREE.BoxGeometry( 1, 1, 1 )
    let gizmo = new THREE.Mesh( geometry, material )
    gizmo.name='gizmo'
    scene.add( gizmo )
    gizmo.position.set(0,0,0)

	// lights

	let light
    light = new THREE.PointLight( 0xffffff , 0.1 , 0)
	light.position.set( 8, 10, 8 )
	scene.add( light )

	light = new THREE.DirectionalLight( 0x333333 )
	light.position.set( -8, 10, 8 )
    scene.add( light )

    light = new THREE.HemisphereLight( 0x333333, 0x333333, 0.6 )
    light.groundColor.setHSL( 0.095, 1, 0.75 )
    light.position.set( 0, 1000, 0 )
    scene.add( light )

	light = new THREE.AmbientLight( 0x555555 )
	scene.add( light )


	// renderer

	let renderer = new THREE.WebGLRenderer( )
	renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.setClearColor(0x000000, 0)

    document.body.appendChild(renderer.domElement)


    let controls = new OrbitControls( camera , renderer.domElement )
    controls.addEventListener( 'change', () =>
        renderer.render( scene, camera )  )

    renderer.render(scene, camera)

    return {camera, scene, renderer}
}
