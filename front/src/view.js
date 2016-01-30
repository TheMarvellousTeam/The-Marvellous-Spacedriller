import {initScene} from './renderer/initScene'
import {CubeRenderer} from './renderer/cube'
import {arrow} from './renderer/arrow'
import {cube as cube_mat} from './renderer/mat'
import {proj} from './renderer/utils/proj'
import THREE,{Vector3} from 'three'


const ui = ( cube, cubeRenderer, scene, camera ) => {

    const range = document.getElementById( 'range' )
    range.max       = cube.getL()/2
    range.value     = cube.getL()/2
    range.min       = 1
    range.step      = 1
    range.addEventListener('input', () => cubeRenderer.setDepth( 0|range.value ).render() )

    const placeArrow = (event) => {

        const x = event.pageX / window.innerWidth
        const y = event.pageY / window.innerHeight

        const {v, origin} = proj( camera, x, y )

        const O = origin.clone().add( v.clone().setLength( 20 ) )

        scene.add( arrow( origin, O ) )



        const {t,cell} = cube.explosion( origin, v, 'd', 2 )

        const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
        const l = cube.getL()
        const c = new THREE.Mesh( geometry, cube_mat(  ) )
        c.position.set(cell.x-l/2+0.5, cell.y-l/2+0.5, cell.z-l/2+0.5)
        scene.add( c )

        cubeRenderer.render()

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
