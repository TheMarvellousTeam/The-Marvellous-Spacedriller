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
import {startSoundtrack, playExplosion} from './sound'


var hexValToColor = function(val) {
    switch(val){
        case 0xFF0000 :
            return '#ff0000'
        case 0x00FF00 :
            return '#00ff00'
        case 0x0000FF :
            return '#0000ff'
        case 0xFFFFFF :
            return '#ffffff'
        case 0xFF00D4 :
            return '#ff00d4'
        case 0xF2CC0D :
            return '#f2cc0d'
        case 0xF2800D :
            return '#f2800D'
        case 0x0DF2CC :
            return '#0df2cc'
    }
}

export var updatePlayers = function(players, drills, colors){
    var playDiv = document.getElementById('players')
    while( playDiv.children.length ){
        playDiv.removeChild(playDiv.children[0])
    }
    for(var i = 0; i<players.length; i++){
        var div = document.createElement('div')
        div.style.color = hexValToColor(colors[i])
        div.innerHTML = players[i] + " drill(" + drills[i]+ ")"
        playDiv.appendChild(div)
    }
}

export var updateScores = function(scores) {
    var scoresDiv = document.getElementById('scores')
    scoresDiv.innerHTML = "team0: "+scores[0]+" | team1: "+scores[1]
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
