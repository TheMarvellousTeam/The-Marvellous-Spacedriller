import {initScene} from './renderer/initScene'
import {CubeRenderer} from './renderer/cube'
import {arrow} from './renderer/arrow'
import {proj} from './renderer/utils/proj'
import {Vector3} from 'three'


const ui = ( cube, cubeRenderer, scene, camera ) => {

    const range = document.getElementById( 'range' )
    range.max       = cube.getL()/2
    range.value     = cube.getL()/2
    range.min       = 1
    range.step      = 1
    range.addEventListener('input', () => cubeRenderer.setDepth( 0|range.value ).render() )


    const fire = document.getElementById( 'fire' )
    fire.addEventListener('click', () => {

        document.body.addEventListener('mousedown', event => {


            scene.add( arrow( new Vector3( 0,0,0) , new Vector3( 10,0,0) ) )
            scene.add( arrow( new Vector3( 0,0,0) , new Vector3( 0,10,0) ) )
            scene.add( arrow( new Vector3( 0,0,0) , new Vector3( 0,0,10) ) )

            const x = event.pageX / window.innerWidth
            const y = event.pageY / window.innerHeight

            const E = proj( camera, x, y )

        })

    })

}


export const init = ( cube ) => {
    const {camera, scene, renderer} = initScene()

    const cubeRenderer = (new CubeRenderer()).setCube( cube ).setDepth( cube.getL() ).render()

    const o = cubeRenderer.getObject()

    scene.add( o )

    ui( cube, cubeRenderer, scene, camera )
}
