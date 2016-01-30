import {initScene} from './renderer/initScene'
import {CubeRenderer} from './renderer/cube'
import {init as initTexture} from './renderer/mat/texture'
import {arrow} from './renderer/arrow'
import {gizmo as gizmo_mat, cube as cube_mat} from './renderer/mat'
import {proj} from './renderer/utils/proj'
import THREE,{Vector3} from 'three'
import {eventBus} from '../../common/eventBus'
import {sendFire} from './comm'
import {minerals} from '../../common/drill'
import {RocketRenderer} from './renderer/rocket'


export var updatePlayers = function(players, drills){
    var playDiv = document.getElementById('players')
    while( playDiv.children.length ){
        playDiv.removeChild(playDiv.children[0])
    }
    for(var i = 0; i<players.length; i++){
        var div = document.createElement('div')
        div.innerHTML = players[i] + " drill(" + drills[i]+ ")"
        playDiv.appendChild(div)
    }
}

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

        // comm
        sendFire(origin, v)

        const fire = document.getElementById( 'fire' )
        fire.removeEventListener('click', attachListener)
        document.body.removeEventListener('mousedown', placeArrow )
    }

    var attachListener = function() {
        document.body.addEventListener('mousedown', placeArrow )
    }

    eventBus.on('authorize_fire', function(){
        const fire = document.getElementById( 'fire' )
        fire.addEventListener('click', attachListener)
    })

    eventBus.on('render_cube', function(cubeSerial){
        cubeRenderer.getCube().hydrate(cubeSerial)
        cubeRenderer.render()
    })

}


export const init = ( cube ) => {
    const {camera, scene, renderer} = initScene()

    const cubeRenderer = (new CubeRenderer).setCube( cube ).setDepth( cube.getL() )

    const rocketRenderer = (new RocketRenderer).init( scene )

    const o = cubeRenderer.getObject()
    scene.add( o )

    initTexture()
        .then( () => {

            cubeRenderer.render()

            rocketRenderer.launch( new Vector3(30,0,0), new Vector3(-30,20,0), 5000 )

        })

    ui( cube, cubeRenderer, scene, camera )
}
