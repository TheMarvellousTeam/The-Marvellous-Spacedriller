import {initScene} from './renderer/initScene'
import {CubeRenderer} from './renderer/cube'
import {GemRenderer} from './renderer/gem'
import {init as initTexture} from './renderer/mat/texture'
import {arrow} from './renderer/arrow'
import {gizmo as gizmo_mat, cube as cube_mat} from './renderer/mat'
import {proj} from './renderer/utils/proj'
import THREE,{Vector3} from 'three'
import {eventBus} from '../../common/eventBus'
import {sendFire} from './comm'
import {minerals} from '../../common/drill'
import {RocketRenderer} from './renderer/rocket'
import {startSoundtrack, playExplosion, playDropbomb} from './sound'

const cellType = {
    'a' : require('file?[hash].[ext]!./asset/texture/core.png'),
    'b' : require('file?[hash].[ext]!./asset/texture/amnesite.png'),
    'c' : require('file?[hash].[ext]!./asset/texture/soft rock.png'),
    'd' : require('file?[hash].[ext]!./asset/texture/rock.png'),
}
export var updatePlayers = function(players, drills, colors, ready){
    var playDiv = document.getElementById('players')
    while( playDiv.children.length ){
        playDiv.removeChild(playDiv.children[0])
    }


    for(var i = 0; i<players.length; i++){
        const div = document.createElement('div')
        div.setAttribute('style', 'display:flex; flex-direction: row; align-items: center; margin-bottom: 5px')

        const pic = document.createElement('div')
        pic.setAttribute('style', 'border-radius:10px; width:20px; height:20px;background-size:cover;')
        pic.style.backgroundColor = colors[i]


        const label = document.createElement('div')
        label.setAttribute('style', 'margin-left:10px;width: 160px; text-transform: capitalize;')
        label.innerHTML = players[ i ]

        const drill = document.createElement('div')
        drill.setAttribute('style', 'width:40px; height:40px;background-size:cover; image-rendering: pixelated;border:solid 1px #fff')
        drill.style.backgroundImage = `url(${ cellType[ drills[ i ] ] })`

        div.appendChild( pic )
        div.appendChild( label )
        div.appendChild( drill )

        playDiv.appendChild( div )
    }
}

const imgUrlA = require('file?[hash].[ext]!./asset/texture/gemA.png')
const imgUrlB = require('file?[hash].[ext]!./asset/texture/gemB.png')
export var updateScores = function(scores) {
    document.getElementById('score_A').innerHTML = scores[0]
    document.getElementById('score_B').innerHTML = scores[1]

    document.getElementById('img_A').style.backgroundImage = `url(${imgUrlA})`
    document.getElementById('img_B').style.backgroundImage = `url(${imgUrlB})`
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

        //scene.add( arrow( origin, O ) ) //test, to trash

        // comm
        sendFire(origin, v)

        const fire = document.getElementById( 'fire' )
        fire.removeEventListener('click', attachListener)
        document.body.removeEventListener('mousedown', placeArrow )
        //eventBus.emit('search_state')
    }

    var attachListener = function() {
        //eventBus.emit('fire_state')
        document.body.addEventListener('mousedown', placeArrow )
    }

    eventBus.on('authorize_fire', function(){
        const fire = document.getElementById( 'fire' )
        fire.addEventListener('click', attachListener)
    })

}

export const init = ( cube, gemBag ) => {
    const {camera, scene, renderer} = initScene()

    const cubeRenderer = (new CubeRenderer).setCube( cube ).setDepth( cube.getL() ) //.setPhase('solid')
    const gemRenderer = (new GemRenderer).setGemBag( gemBag ).setCube( cube )
    const rocketRenderer = (new RocketRenderer)

    scene.add( cubeRenderer.getObject() )
    scene.add( gemRenderer.getObject() )
    scene.add( rocketRenderer.getObject() )

    initTexture()
        .then( () => {

            startSoundtrack()

            cubeRenderer.render()
            gemRenderer.render()

            eventBus.on('render_fire', function(data){
                playDropbomb()
                rocketRenderer.launch(data.start, data.end, data.time, parseInt( data.color.slice(1), 16 ) )
                setTimeout( function() {
                    if ( data.hit ) playExplosion()
                    cubeRenderer.getCube().hydrate(data.cube)
                    cubeRenderer.render()
                }, data.time)
            })

        })

    ui( cube, cubeRenderer, scene, camera )


}
