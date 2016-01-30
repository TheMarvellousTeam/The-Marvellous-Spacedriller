import THREE, {Vector3} from 'three'
import {default as GPUParticleSystem} from '../../external/GPUParticleSystem'
import {cube as cube_mat} from '../mat'

const options = {
    positionRandomness: .3,
    velocity: new THREE.Vector3(),
    velocityRandomness: .5,
    color: 0xaa88ff,
    colorRandomness: .2,
    turbulence: .5,
    lifetime: 2,
    size: 5,
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

    init( scene ){

        this._particleSystem = new THREE.GPUParticleSystem({
            maxParticles: 25000
        })
        scene.add( this._particleSystem )

        return this
    }

    getObject(){
        return this._object3D
    }

    launch( A, B, delay ){

        const pos = (new Vector3).clone( A )

        let _cancel
        const start = Date.now()
        const loop = () => {

            const tick = Date.now() * spawnerOptions.timeScale;

            const k = ( Date.now() - start )


            pos.lerpVectors( A, B, k / delay )

            if ( k < delay )
            for ( let k = 100; k--; )
                this._particleSystem.spawnParticle( {...options, position: pos } )


            this._particleSystem.update(k / 1000)


            _cancel = requestAnimationFrame( loop )
        }
        loop()



        return {
            cancel : () => cancelAnimationFrame( _cancel ),
        }
    }
}
