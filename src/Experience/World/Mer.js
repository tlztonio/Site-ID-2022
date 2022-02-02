import Experience from "../Experience"
import * as THREE from "three"
import fragmentShader from "../shaders/Mer/fragment.glsl"
import vertexShader from "../shaders/Mer/vertex.glsl"

export default class Mer {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug
        this.camera = this.experience.camera

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Mer')
        }

        // setup
        this.setInstance()
    }

    setInstance() {
        this.geometry = new THREE.PlaneGeometry(4, 4, 80, 80)

        const count = this.geometry.attributes.position.count
        const randoms = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            randoms[i] = Math.random()
        }

        this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

        const waves = {
            A: { direction: 0, steepness: 0.1, wavelength: 0.5 },
            B: { direction: 30, steepness: 0.1, wavelength: 0.5 },
            C: { direction: 60, steepness: 0.1, wavelength: 0.5 },
        };

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uFrequency: { value: new THREE.Vector2(10, 5) },
                uTime: { value: 0 },
                PI: { value: Math.PI },
                transparent: true,
            },
        })

        // this.material.alphaTest = 0.5

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.set(-Math.PI * 0.5, 0, 0)
        this.mesh.position.set(-5, -0.27, 0)
        // this.mesh.castShadow = true;
        // this.mesh.receiveShadow = true;
        this.scene.add(this.mesh)


        if (this.debug.active) {
            // this.debugFolder.add(this.porteObject.rotation, 'y').min(-3).max(3).step(0.01)
        }
    }

    update() {
        this.material.uniforms.uTime.value += this.time.delta
        // console.log(this.material.uniforms.uTime.value)
    }

}