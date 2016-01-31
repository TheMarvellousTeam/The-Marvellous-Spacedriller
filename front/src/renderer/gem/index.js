import THREE, {Vector3} from 'three'
import {gem as gem_mat} from '../mat'

export class GemRenderer {

    constructor(){
        this._object3D = new THREE.Object3D()
    }

    init( scene ){

        return this
    }

    getObject(){
        return this._object3D
    }

    setGemBag( gemBag ){
        this._gemBag = gemBag

        return this
    }

    setCube( cube ){
        this._cube = cube

        return this
    }

    render( ){

        const o = this._object3D

        o.remove( ...o.children )


        const l = this._cube.getL()

        const mat = {
            gemA    : gem_mat('gemA'),
            gemB    : gem_mat('gemB'),
        }

        this._gemBag.getGems()
            .forEach( ({type, position}) => {

                const sprite = new THREE.Sprite( mat[ type ] )
                sprite.scale.x= sprite.scale.y= sprite.scale.z= 0.8

                sprite.position.set( position.x + 0.5 - l/2, position.y + 0.5 - l/2, position.z + 0.5 - l/2 )

                o.add( sprite )

                // const geometry = new THREE.SphereGeometry( 0.5, 8, 8 )
            	// const material = new THREE.MeshBasicMaterial( { color: 0x512adc } )
            	// const sphere = new THREE.Mesh( geometry, material )
                //
                // sphere.position.set( position.x + 0.5 - l/2, position.y + 0.5 - l/2, position.z + 0.5 - l/2 )
                // o.add( sphere )
            })

        return this
    }
}
