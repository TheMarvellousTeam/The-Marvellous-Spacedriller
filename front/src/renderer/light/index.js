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

    var lightColor = 0x9911CC
	var pointLight = new THREE.PointLight( lightColor, 1, 60 );

	var geometry = new THREE.SphereGeometry( 0.1, 8, 8 )
	var material = new THREE.MeshBasicMaterial( { color: lightColor } )
	var sphere = new THREE.Mesh( geometry, material )
	pointLight.add( sphere )
    scene.add( pointLight )


    lightColor = 0xCCCCCC
	const pointLight2 = new THREE.PointLight( lightColor, 1, 60 );

	geometry = new THREE.SphereGeometry( 0.1, 8, 8 )
	material = new THREE.MeshBasicMaterial( { color: lightColor } )
	sphere = new THREE.Mesh( geometry, material )
	pointLight2.add( sphere )
    scene.add( pointLight2 )

    lightColor = 0xDDDDDD
	const pointLight3 = new THREE.PointLight( lightColor, 1, 60 );

	geometry = new THREE.SphereGeometry( 0.1, 8, 8 )
	material = new THREE.MeshBasicMaterial( { color: lightColor } )
	sphere = new THREE.Mesh( geometry, material )
	pointLight3.add( sphere )
    scene.add( pointLight3 )


    const r = cubeSize* 0.4
    const r2 = cubeSize* 0.8
    const r3 = cubeSize* 0.86
    const h = cubeSize* 0.6

    let k=0
    const loop = () => {

        k ++
        pointLight.position.set( Math.sin( k * 0.01 ) * r*0.9,  Math.cos( k * 0.01 ) * r ,h )

        pointLight2.position.set( Math.sin( k * 0.005 ) * r2,  Math.cos( k * 0.005 ) * r2 , 8 )

        pointLight3.position.set( Math.sin( k * 0.005 + 2 ) * r3,  Math.cos( k * 0.005 +2 ) * r3 , 12 )

        requestAnimationFrame( loop )
    }
    loop()

}
