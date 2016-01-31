import THREE, {Vector3} from 'three'
import {cubeSize} from '../../../../common/params'


export const init = ( scene ) => {

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


    const r = cubeSize* 1.5

    let k=0
    const loop = () => {

        k ++
        pointLight.position.set( Math.sin( k * 0.01 ) * Math.sin( k * 0.006 ) * r,  Math.cos( k * 0.01 ) * r, Math.cos( k * 0.006 ) * r )

        requestAnimationFrame( loop )
    }
    loop()

}
