import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width:350 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Galaxy
 */
const parameters = {
    count: 100000,
    particleSize: 0.01,
    radius: 5,
    branches: 5,
    spinAngle: 1,
    randomness:0.02,
    randomPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
}

let geometry = null
let material = null
let particles = null

const generateGalaxy = () => {
    if(geometry != null){
        geometry.dispose()
        material.dispose()
        scene.remove(particles)
    }

    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)
    
    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spinAngle
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomPower) * (Math.random() < 0.5 ? 1 : -1) /2
        const randomZ = Math.pow(Math.random(), parameters.randomPower) * (Math.random() < 0.5 ? 1 : -1)


        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3+1] = randomY / 2
        positions[i3+2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
    
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3] = mixedColor.r
        colors[i3+1] = mixedColor.g
        colors[i3+2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    material = new THREE.PointsMaterial({ 
        size: parameters.particleSize,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })
    
    particles = new THREE.Points(geometry, material)
    scene.add(particles)
}
generateGalaxy()
gui.add(parameters, 'count', 100, 1000000, 100).onFinishChange(generateGalaxy).name('Number of Particles')
gui.add(parameters, 'particleSize', 0.001, .1, 0.001).onFinishChange(generateGalaxy).name('Size of particles')
gui.add(parameters, 'radius', 0.01, 20, 0.01).onFinishChange(generateGalaxy).name('Galaxy Radius')
gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(generateGalaxy).name('Number of Branches')
gui.add(parameters, 'spinAngle', -5, 5, 0.01).onFinishChange(generateGalaxy).name('Branch Spin Angle')
gui.add(parameters, 'randomness', 0, 2, 0.01).onFinishChange(generateGalaxy).name('Randomness')
gui.add(parameters, 'randomPower', 1, 10, 0.01).onFinishChange(generateGalaxy).name('Power of Randomness')
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy).name('Inside Color')
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy).name('Outside Color')

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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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

    if(particles != null){
        particles.rotation.y = (elapsedTime / parameters.branches) * - parameters.spinAngle / parameters.radius
    }
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()