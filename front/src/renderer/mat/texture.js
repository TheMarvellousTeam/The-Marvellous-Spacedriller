import THREE from 'three'

export const textures = {}

let processing = 0

export const init = () =>
    new Promise( resolve => {

        const loader = new THREE.TextureLoader()

        processing++
        loader.load(

            require('file?[hash].[ext]!../../asset/texture/gemA.png'),

            ( t ) => {

                t.wrapS = t.wrapT = THREE.RepeatWrapping
                t.magFilter = THREE.NearestFilter
                t.minFilter = THREE.NearestFilter
                t.repeat.set( 1, 1 )
                textures[ 'gemA' ] = t

                processing--
                if ( !processing )
                    resolve()
            }
        )

        processing++
        loader.load(

            require('file?[hash].[ext]!../../asset/texture/gemB.png'),

            ( t ) => {

                t.wrapS = t.wrapT = THREE.RepeatWrapping
                t.magFilter = THREE.NearestFilter
                t.minFilter = THREE.NearestFilter
                t.repeat.set( 1, 1 )
                textures[ 'gemB' ] = t

                processing--
                if ( !processing )
                    resolve()
            }
        )

        const cellType = {
            'a' : require('file?[hash].[ext]!../../asset/texture/core.png'),
            'b' : require('file?[hash].[ext]!../../asset/texture/amnesite.png'),
            'c' : require('file?[hash].[ext]!../../asset/texture/soft rock.png'),
            'd' : require('file?[hash].[ext]!../../asset/texture/rock.png'),
        }

        Object.keys( cellType )
            .forEach( c => {

                processing++
                loader.load(

                    cellType[ c ],

                    ( t ) => {

                        t.wrapS = t.wrapT = THREE.RepeatWrapping
                        t.magFilter = THREE.NearestFilter
                        t.minFilter = THREE.NearestFilter
                        t.repeat.set( 1, 1 )
                        textures[ c ] = t

                        processing--
                        if ( !processing )
                            resolve()
                    }
                )

            })
})
