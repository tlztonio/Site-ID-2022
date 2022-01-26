import Experience from "../Experience"
import * as THREE from "three"
import gsap from "gsap"
import fragmentShader from "../shaders/fragment.glsl"
import vertexShader from "../shaders/vertex.glsl"

export default class Sable {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        // this.raycaster = this.experience.raycaster
        this.debug = this.experience.debug

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('sable')
        }

        // setup
        this.resource = this.experience.resources.items.sableModel

        this.setInstance()
    }

    setInstance() {
        this.geometry = new THREE.PlaneGeometry(10, 4, 200, 80)

        const count = this.geometry.attributes.position.count
        const randoms = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            randoms[i] = Math.random()
        }

        this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                // fogColor: { value: this.scene.fog.color },
                // fogDensity: { value: this.scene.fog.density },
                // fogFar: { value: this.scene.fog.far },
                // fogNear: { value: this.scene.fog.near },
                uFrequency: { value: new THREE.Vector2(10, 5) },
                uTime: { value: 0 },
            },
            fog: true
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        // this.mesh.scale.y = 2 / 3
        // this.mesh.rotation.set(-Math.PI * 0.5, 0, 0)
        this.scene.add(this.mesh)

        if (this.debug.active) {
            // this.debugFolder.add(this.porteObject.rotation, 'y').min(-3).max(3).step(0.01)
        }
    }

    update() {

    }
}