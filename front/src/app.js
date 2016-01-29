import {Cube} from '../../common/cube'
import {initScene} from './renderer/initScene'
import {CubeRenderer} from './renderer/cube'


require('file?name=index.html!./app.html');

window.onload = () => {

    const {camera, scene, renderer} = initScene()

    const l=1
    const cube = (new Cube()).generate( 10 )


    const cubeRenderer = (new CubeRenderer()).setCube( cube )

    const o = cubeRenderer.render()

    scene.add( o )
}
