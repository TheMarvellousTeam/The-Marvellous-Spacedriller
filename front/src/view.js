import {initScene} from './renderer/initScene'
import {CubeRenderer} from './renderer/cube'
import {arrow} from './renderer/arrow'
import {proj} from './renderer/utils/proj'
import THREE,{Vector3} from 'three'


const ui = ( cube, cubeRenderer, scene, camera ) => {

    const range = document.getElementById( 'range' )
    range.max       = cube.getL()/2
    range.value     = cube.getL()/2
    range.min       = 1
    range.step      = 1
    range.addEventListener('input', () => cubeRenderer.setDepth( 0|range.value ).render() )

    const placeArrow = () => {

        const x = event.pageX / window.innerWidth
        const y = event.pageY / window.innerHeight

        const {v, origin} = proj( camera, x, y )

        const O = origin.clone().add( v.setLength( 20 ) )

        scene.add( arrow( origin, O ) )

        console.log( 'place' )

        document.body.removeEventListener('mousedown', placeArrow )
    }

    const fire = document.getElementById( 'fire' )
    fire.addEventListener('click', () => {


        document.body.addEventListener('mousedown', placeArrow )



    })

}


export const init = ( cube ) => {
    const {camera, scene, renderer} = initScene()

    const cubeRenderer = (new CubeRenderer()).setCube( cube ).setDepth( cube.getL() ).render()

    const o = cubeRenderer.getObject()

    scene.add( o )

    scene.add( new THREE.AxisHelper( 7 ) )

    ui( cube, cubeRenderer, scene, camera )
}
