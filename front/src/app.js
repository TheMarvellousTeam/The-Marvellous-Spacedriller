import {Cube} from '../../common/cube'
import {initScene} from './renderer/initScene'
import {CubeRenderer} from './renderer/cube'
var io = require('socket.io-client')


require('file?name=index.html!./app.html');


var loadCube = function(cube_data){
    const {camera, scene, renderer} = initScene()

    const l=1
    const cube = new Cube()
    cube.hydrate( cube_data )


    const cubeRenderer = (new CubeRenderer()).setCube( cube ).setDepth( 10 ).render()

    const o = cubeRenderer.getObject()

    scene.add( o )


    const range = document.getElementById( 'range' )
    range.max   = 5
    range.step  = 1
    range.addEventListener('input', () => cubeRenderer.setDepth( 0|range.value ).render() )
}

window.onload = () => {


    var socket = io.connect('http://localhost:1984')
    socket.on('start', function(data){
        loadCube(data.cube)
    })

    socket.emit('ready')
}
