import './style.css'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.FirstCanvas')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#392f5a')

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
import particleString from '/textures/particle.png'
const particleTexture = textureLoader.load(particleString)


/**
 * Fonts
 */

const fontLoader = new FontLoader()

let text = null
let secondText = null
const TextGroup = new THREE.Group()
const textMaterial = new THREE.MeshNormalMaterial()

import lobsterURL from '/fonts/Lobster_Regular.json?url'
fontLoader.load(
    lobsterURL,
    (font) => {
        const textGeometry = new TextGeometry(
            'Theo Winters',
            {
                font,
                size: 1.5,
                height: 0.2,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()
        text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.set(0, 0, -5)
        TextGroup.add(text)
    }
)

import inconsolataURL from '/fonts/Inconsolata_Regular.json?url'
fontLoader.load(
    inconsolataURL,
    (font) => {
        const secondGeometry = new TextGeometry(
            'Design',
            {
                font,
                size: 0.7,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: false
            }
        )
        secondGeometry.center()
        secondText = new THREE.Mesh(secondGeometry, textMaterial)
        secondText.position.set(4, -1.5, -5)
        TextGroup.add(secondText)
    }
)

scene.add(TextGroup)
//Stars
const particleGeometry = new THREE.BufferGeometry()
const count = 5000
const positions = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 25
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    color: '#F4D06F',
    transparent: true,
    alphaMap: particleTexture,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})
const particles = new THREE.Points(particleGeometry, particleMaterial)
// gui.addColor(particleMaterial, 'color')
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    ratio: window.innerWidth/window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.ratio = window.innerWidth / window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


if(sizes.ratio < 1){
    TextGroup.position.set(0, 3, -5) //For Mobile
} else {
    TextGroup.position.set(4, 2, 0) //For Desktop
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
scene.add(camera)

if(window.DeviceOrientationEvent){
    let gamma
    window.addEventListener('deviceorientation', event => {
        gamma = event.gamma
        camera.rotation.y = gamma / 30
    }, true)
} else {
    const mousePos = new THREE.Vector2()
    canvas.addEventListener('mousemove', (event) => { 
    mousePos.x = ( event.clientX / window.innerWidth ) * 2 - 1
    mousePos.y = - ( event.clientY / window.innerHeight ) * 2 + 1
    camera.position.x = mousePos.x * 2
    camera.position.y = mousePos.y * 6
    camera.lookAt(new THREE.Vector3(0,0,0))
    })
}






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

    particles.rotation.x = elapsedTime / 60
    particles.rotation.y = elapsedTime / 75

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()