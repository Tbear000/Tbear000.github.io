import '../style.css'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Fonts
 */

const fontLoader = new FontLoader()

let text = null
let secondText = null
const textMaterial = new THREE.MeshBasicMaterial({ wireframe:true })

import inconsolataURL from '/fonts/Inconsolata_Regular.json?url'
fontLoader.load(
    inconsolataURL,
    (font) => {
        const textGeometry = new TextGeometry(
            'Under Construction',
            {
                font,
                size: 1,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const secondGeometry = new TextGeometry(
            'Please come back later',
            {
                font,
                size: 0.7,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.015,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 3
            }
        )
        textGeometry.center()
        text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.y = 1
        secondGeometry.center()
        secondText = new THREE.Mesh(secondGeometry, textMaterial)
        secondText.position.y = -1
        scene.add(text, secondText)
    }
)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
scene.add(camera)

const mousePos = new THREE.Vector2()
canvas.addEventListener('mousemove', (event) => { 
    mousePos.x = ( event.clientX / window.innerWidth ) * 2 - 1
    mousePos.y = - ( event.clientY / window.innerHeight ) * 2 + 1
    camera.position.x = mousePos.x * 2
    camera.position.y = mousePos.y * 6
    camera.lookAt(new THREE.Vector3(0,0,0))
})

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

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()