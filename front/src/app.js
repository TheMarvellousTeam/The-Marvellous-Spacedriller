import {Cube} from '../../common/cube'
import {initScene} from './renderer/initScene'
import {CubeRenderer} from './renderer/cube'


require('file?name=index.html!./app.html');

window.onload = () => {

    const {camera, scene, renderer} = initScene()

    const l=1
    const cube = (new Cube()).generate( 10 )


    const cubeRenderer = (new CubeRenderer()).setCube( cube ).setDepth( 10 ).render()

    const o = cubeRenderer.getObject()

    scene.add( o )


    const range = document.getElementById( 'range' )
    range.max   = 5
    range.step  = 1
    range.addEventListener('input', () => cubeRenderer.setDepth( 0|range.value ).render() )
}
