import {initScene} from './renderer/initScene'
import {CubeRenderer} from './renderer/cube'
import {init as initTexture} from './renderer/mat/texture'
import {arrow} from './renderer/arrow'
import {gizmo as gizmo_mat, cube as cube_mat} from './renderer/mat'
import {proj} from './renderer/utils/proj'
import THREE,{Vector3} from 'three'
import {eventBus} from '../../common/eventBus'
import {sendFire} from './comm'


export var updatePlayers = function(players){
    var playDiv = document.getElementById('players')
    while( playDiv.children.length ){
        playDiv.removeChild(playDiv.children[0])
    }
    for(var i = players.length; i-- ;){
        var div = document.createElement('div')
        div.innerHTML = players[i]
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

        /*
        const {t, cell, p} = cube.explosion( origin, v, 'd', 6 ) || {}

        if ( cell ) {

            const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 )
            const l = cube.getL()
            const c = new THREE.Mesh( geometry, cube_mat(  ) )
            c.position.set(p.x, p.y, p.z)
            scene.add( c )

            const geometry2 = new THREE.BoxGeometry( 1, 1, 1 )
            const h = new THREE.Mesh( geometry2, gizmo_mat(  ) )
            h.position.set(cell.x-l/2+0.5, cell.y-l/2+0.5, cell.z-l/2+0.5)
            scene.add( h )


            cubeRenderer.render()

        }
        */

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

    const cubeRenderer = (new CubeRenderer()).setCube( cube ).setDepth( cube.getL() )

    const o = cubeRenderer.getObject()
    scene.add( o )

    initTexture()
        .then( () => {

            cubeRenderer.render()

        })

    ui( cube, cubeRenderer, scene, camera )
}
