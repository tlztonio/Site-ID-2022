import Experience from "../Experience"
import * as THREE from "three"
import fragmentShader from "../shaders/Nuages/fragment.glsl"
import vertexShader from "../shaders/Nuages/vertex.glsl"

export default class Nuages {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Nuages')
        }

        this.setModel()
    }

    setModel() {

        this.geometry = new THREE.CylinderGeometry(12, 12, 10, 16, 1, true)
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uDebug: { value: new THREE.Vector2(0.5, 0.0) },
                uResolution: { value: new THREE.Vector2(this.sizes.width, this.sizes.height) },
                uTime: { value: 0 },
                PI: { value: Math.PI },
                uRandomFbm: { value: Math.random() * 20 },
            },
            side: THREE.BackSide
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 2, 0)
        this.mesh.rotation.set(0, 0, 0)
        this.scene.add(this.mesh)

        // debug
        if (this.debug.active) {
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'x').min(-1).max(1).step(0.01).name("uDebugX")
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'y').min(-1).max(1).step(0.01).name("uDebugY")
        }
    }

    update() {
        this.material.uniforms.uTime.value += this.time.delta
    }

    mouseMove(e) {
    }
}