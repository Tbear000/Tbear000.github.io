import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as lil from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new lil.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xaa7da2)
gui.addColor(scene, 'background').name("Background Color")

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture1 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/9.png')

/**
 * Fonts
 */

const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Theo Winters',
            {
                font,
                size: 0.75,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()
        const secondGeometry = new TextGeometry(
            'Contact',
            {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        secondGeometry.center()
        const thirdGeometry = new TextGeometry(
            'Examples',
            {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        thirdGeometry.center()
        const textMaterial = new THREE.MeshNormalMaterial()
        // const textMaterial2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        // text.position.z = 0.1
        const secondText = new THREE.Mesh(secondGeometry, textMaterial)
        secondText.position.y = -1.5
        secondText.rotation.x = Math.PI / 8
        const thirdText = new THREE.Mesh(thirdGeometry, textMaterial)
        thirdText.position.y = 1.5
        thirdText.rotation.x = - Math.PI / 8
        scene.add(text, secondText, thirdText)
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
camera.position.z = 2
scene.add(camera)

const mousePos = new THREE.Vector2()
canvas.addEventListener('mousemove', (event) => { 
    mousePos.x = ( event.clientX / window.innerWidth ) * 2 - 1
    mousePos.y = - ( event.clientY / window.innerHeight ) * 2 + 1
    camera.position.x = mousePos.x * 2
    camera.position.y = mousePos.y * 5
    camera.lookAt(new THREE.Vector3(0,0,0))
})


/**
 * Objects
 */

const objectGroup = new THREE.Group()
scene.add(objectGroup)

const objects = new Array(500)
const objMat = new THREE.MeshBasicMaterial()
objMat.transparent = true
objMat.opacity = 0.5
objMat.color = new THREE.Color( 0x6161ea )

gui.addColor(objMat, 'color').name("Rain Color")
for (let i = 0; i < objects.length; i++) {
    const rndm = Math.random()/20
    const objGeo = new THREE.ConeBufferGeometry(rndm, rndm*10, 5, 3)
    objects[i] = new THREE.Mesh(objGeo, objMat)
    objects[i].position.x = (Math.random() - 0.5) * 20
    objects[i].position.y = (Math.random() - 0.5) * 20
    objects[i].position.z = (Math.random() - 0.5) * 20
    objects[i].randomNumber = Math.random() + 0.4
    objectGroup.add(objects[i])
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
const raycaster = new THREE.Raycaster()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Raycast
    raycaster.setFromCamera(mousePos, camera)

    const intersects = raycaster.intersectObjects(scene.children);
    if(intersects[0] != null){
        
    }

    //Rotate Scene
    objectGroup.rotation.y = elapsedTime / 20

    for (let j = 0; j < objects.length; j++) {
        objects[j].position.y -= objects[j].randomNumber * 0.2
        if(objects[j].position.y < -10){
            objects[j].position.y = 10
        } 
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()