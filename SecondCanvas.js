import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.SecondCanvas')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x353535)

/**
 * Objects
 */
 const geometry = new THREE.TorusKnotGeometry( 1, 0.4, 64, 8 );
 const material = new THREE.MeshToonMaterial( { color: 0xffff00 } );
 const torusKnot = new THREE.Mesh( geometry, material );
 const material2 = new THREE.MeshToonMaterial( { color: 0xff00ff } );
 const torusKnot2 = new THREE.Mesh( geometry, material2 );
 torusKnot2.position.set(-5, 3, -3)
 scene.add( torusKnot, torusKnot2 );

 //Light
 const pLight = new THREE.PointLight(0xffffff, 1, 50)
 pLight.position.set(0, 0, 5)
 scene.add(pLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 5)
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()


    torusKnot.rotation.y = elapsedTime /2.34
    torusKnot.rotation.x = elapsedTime / 4.2
    torusKnot2.rotation.x = -elapsedTime/ 1.53
    torusKnot2.rotation.z = elapsedTime/ 5.23


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()