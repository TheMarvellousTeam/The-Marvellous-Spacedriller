import THREE, {Vector3} from 'three'
import {default as GPUParticleSystem} from '../../external/GPUParticleSystem'
import {cube as cube_mat} from '../mat'

const options = {
    positionRandomness: .3,
    velocity: new THREE.Vector3(),
    velocityRandomness: .5,
    color: 0xaa88ff,
    colorRandomness: .2,
    turbulence: .2,
    lifetime: 2,
    size: 10,
    sizeRandomness: 1,
    smoothPosition : 1,
}

const spawnerOptions = {
    spawnRate: 15000,
    horizontalSpeed: 1.5,
    verticalSpeed: 1.33,
    timeScale: 1
}
export class RocketRenderer {

    constructor(){
        this._object3D = new THREE.Object3D()
    }

    getObject(){
        return this._object3D
    }

    launch( A, B, delay, color ){

        const particuleSys = new THREE.GPUParticleSystem({
            maxParticles: 25000
        })

        this._object3D.add( particuleSys )

        const position = (new Vector3).clone( A )

        let _cancel
        const start = Date.now()
        const loop = () => {

            const tick = Date.now() * spawnerOptions.timeScale;

            const k = ( Date.now() - start )


            position.lerpVectors( A, B, k / delay )

            if ( k < delay )
            for ( let k = 50; k--; )
                particuleSys.spawnParticle( {...options, color, position } )


            particuleSys.update(k / 1000)

            if ( k < delay + 3000 )
                _cancel = requestAnimationFrame( loop )

            else
                this._object3D.remove( particuleSys )
        }
        loop()



        return {
            cancel : () => cancelAnimationFrame( _cancel ),
        }
    }
}
