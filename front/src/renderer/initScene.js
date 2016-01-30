import THREE, {Vector3} from 'three'
const OrbitControls = require('three-orbit-controls')(THREE)
import {default as Stats} from 'stats.js'


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

	// lights

	let light = new THREE.DirectionalLight( 0x333333 )
	light.position.set( -8, 10, 8 )
    scene.add( light )

    light = new THREE.PointLight( 0xffffff , 0.1 , 0)
	light.position.set( 8, 10, 8 )
	scene.add( light )

    light = new THREE.HemisphereLight( 0x333333, 0x333333, 0.6 )
    light.groundColor.setHSL( 0.095, 1, 0.75 )
    light.position.set( 0, 1000, 0 )
    scene.add( light )

	light = new THREE.AmbientLight( 0x555555 )
	scene.add( light )

    const lightColor = 0x9981CC
	const pointLight = new THREE.PointLight( lightColor, 1, 60 );
	// pointLight.castShadow = true;
	// pointLight.shadowCameraNear = 1;
	// pointLight.shadowCameraFar = 30;
	// pointLight.shadowMapWidth = 2048;
	// pointLight.shadowMapHeight = 1024;
	// pointLight.shadowBias = 0.01;
	// pointLight.shadowDarkness = 0.5;

	var geometry = new THREE.SphereGeometry( 0.5, 8, 8 )
	var material = new THREE.MeshBasicMaterial( { color: lightColor } )
	var sphere = new THREE.Mesh( geometry, material )
	pointLight.add( sphere )
    scene.add( pointLight )

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
    controls.addEventListener( 'change', () => 0 )



    let k=0
    const loop = () => {
        stats.begin()
        renderer.render( scene, camera )
        stats.end()

        requestAnimationFrame( loop )


        k ++
        pointLight.position.set( Math.sin( k * 0.01 ) * Math.sin( k * 0.006 ) * 45,  Math.cos( k * 0.01 ) * 45, Math.cos( k * 0.006 ) * 45 )
    }
    loop()

    renderer.render(scene, camera)

    return {camera, scene, renderer}
}
