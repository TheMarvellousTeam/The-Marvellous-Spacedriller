
export const proj = ( camera, x, y ) => {

    const ratio = window.innerWidth / window.innerHeight

    const lookAt = new Vector3()
    const V = ( new Vector3 ).subVectors( lookAt, camera.position )
    const l = V.length()

    const w = Math.sin( camera.fov ) * l
    const h = w / camera.aspect

    const E = new Vector3( x*w -0.5, y*h -0.5 )

    const E_ = (new Vector3).fromArray( camera.projectionMatrix.applyToVector3Array( E.toArray() ) )

    return E_
}
