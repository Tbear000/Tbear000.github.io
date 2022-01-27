import * as THREE from 'three';
import gsap from 'gsap';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
},
    canvas = document.querySelector('canvas.SecondCanvas'),
    raycaster = new THREE.Raycaster(),
    mouse = {
        x: undefined,
        y: undefined
    }

let mouseY = 0,

    windowHalfY = window.innerHeight / 2,
    frame = 0,
    camera, scene, renderer, plane;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 1, 3000);
    camera.position.z = 50;

    scene = new THREE.Scene();

    const geometry = new THREE.PlaneBufferGeometry(400, 400, 50, 50)
    const material = new THREE.MeshPhongMaterial({ flatShading: THREE.FlatShading, vertexColors: true })
    plane = new THREE.Mesh(geometry, material)
    scene.add(plane)
    generatePlane(plane)
    plane.rotation.x = -Math.PI / 8

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, -1, 1)
    scene.add(light)

    const backLight = new THREE.DirectionalLight(0xffffff, 1)
    backLight.position.set(0, 0, -1)
    scene.add(backLight)

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width, sizes.height);

    document.body.style.touchAction = 'none';
    document.body.addEventListener('mousemove', onPointerMove);

    window.addEventListener('resize', onWindowResize);
}

function generatePlane(plane) {
    plane.geometry.dispose()
    plane.geometry = new THREE.PlaneGeometry(
        400,
        400,
        50,
        50
    )

    // vertice position randomization
    const { array } = plane.geometry.attributes.position
    const randomValues = []
    for (let i = 0; i < array.length; i++) {
        if (i % 3 === 0) {
            const x = array[i]
            const y = array[i + 1]
            const z = array[i + 2]

            array[i] = x + (Math.random() - 0.5) * 3
            array[i + 1] = y + (Math.random() - 0.5) * 3
            array[i + 2] = z + (Math.random() - 0.5) * 3
        }

        randomValues.push(Math.random() * Math.PI * 2)
    }

    plane.geometry.attributes.position.randomValues = randomValues
    plane.geometry.attributes.position.originalPosition =
        plane.geometry.attributes.position.array

    const colors = []
    for (let i = 0; i < plane.geometry.attributes.position.count; i++) {
        colors.push(0, 0.19, 0.4)
    }

    plane.geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(new Float32Array(colors), 3)
    )
}

function onWindowResize() {

    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerMove(event) {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = -(event.clientY / innerHeight) * 2 + 1
}

function animate() {

    requestAnimationFrame(animate);

    render();

}


function render() {

    renderer.render(scene, camera);
    raycaster.setFromCamera(mouse, camera)

    frame += 0.01
    
    
    const {
        array,
        originalPosition,
        randomValues
      } = plane.geometry.attributes.position
      for (let i = 0; i < array.length; i += 3) {
        // x
        array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01
    
        // y
        array[i + 1] =
          originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.001
      }

      plane.geometry.attributes.position.needsUpdate = true
      const intersects = raycaster.intersectObject(plane)
      if (intersects.length > 0) {
        const { color } = intersects[0].object.geometry.attributes
    
        // vertice 1
        color.setX(intersects[0].face.a, 0.1)
        color.setY(intersects[0].face.a, 0.5)
        color.setZ(intersects[0].face.a, 1)
    
        // vertice 2
        color.setX(intersects[0].face.b, 0.1)
        color.setY(intersects[0].face.b, 0.5)
        color.setZ(intersects[0].face.b, 1)
    
        // vertice 3
        color.setX(intersects[0].face.c, 0.1)
        color.setY(intersects[0].face.c, 0.5)
        color.setZ(intersects[0].face.c, 1)
    
        intersects[0].object.geometry.attributes.color.needsUpdate = true
    
        const initialColor = {
          r: 0,
          g: 0.19,
          b: 0.4
        }
    
        const hoverColor = {
          r: 0.1,
          g: 0.5,
          b: 1
        }
    
        gsap.to(hoverColor, {
          r: initialColor.r,
          g: initialColor.g,
          b: initialColor.b,
          duration: 1,
          onUpdate: () => {
            // vertice 1
            color.setX(intersects[0].face.a, hoverColor.r)
            color.setY(intersects[0].face.a, hoverColor.g)
            color.setZ(intersects[0].face.a, hoverColor.b)
    
            // vertice 2
            color.setX(intersects[0].face.b, hoverColor.r)
            color.setY(intersects[0].face.b, hoverColor.g)
            color.setZ(intersects[0].face.b, hoverColor.b)
    
            // vertice 3
            color.setX(intersects[0].face.c, hoverColor.r)
            color.setY(intersects[0].face.c, hoverColor.g)
            color.setZ(intersects[0].face.c, hoverColor.b)
            color.needsUpdate = true
          }
        })
      }
}
