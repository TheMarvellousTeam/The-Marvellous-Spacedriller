import THREE from 'three'

export const textures = {}

let processing = 0

export const init = () =>
    new Promise( resolve => {

        const loader = new THREE.TextureLoader()

        processing++
        loader.load(

            require('file?[hash].[ext]!../../asset/texture/rock.png'),

            ( t ) => {

                t.wrapS = THREE.ClampToEdgeWrapping
                t.wrapT = THREE.ClampToEdgeWrapping
                t.magFilter = THREE.NearestFilter
                t.minFilter = THREE.NearestFilter
                t.repeat = 1
                textures[ 'rock' ] = t

                processing--
                if ( !processing )
                    resolve()
            }
        )

        processing++
        loader.load(

            require('file?[hash].[ext]!../../asset/texture/soft rock.png'),

            ( t ) => {

                /*
                t.wrapS = THREE.ClampToEdgeWrapping
                t.wrapT = THREE.ClampToEdgeWrapping
                t.magFilter = THREE.NearestFilter
                t.minFilter = THREE.NearestFilter
                t.generateMipmaps = false
                t.needUpdate = true
                t.repeat = 1
                */
                t.wrapS = t.wrapT = THREE.RepeatWrapping
                t.magFilter = THREE.NearestFilter
                t.minFilter = THREE.NearestFilter
                t.repeat.set( 1, 1 )
                textures[ 'soft rock' ] = t

                processing--
                if ( !processing )
                    resolve()
            }
        )
})
