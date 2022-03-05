import Experience from "../Experience"
import * as THREE from "three"
import fragmentShader from "../shaders/Nuages/fragment.glsl"
import vertexShader from "../shaders/Nuages/vertex.glsl"

export default class Nuages {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Nuages')
        }

        // setup
        this.cloud = {}
        this.cloud.texture = this.resources.items.textureNuage1

        this.setModel()
    }

    setModel() {

        this.geometry = new THREE.CylinderGeometry(12, 12, 10, 16, 1, true)
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uDebug: { value: new THREE.Vector2(0.0, 0.0) },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uTime: { value: 0 },
                PI: { value: Math.PI },
            },
            side: THREE.BackSide
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 2, 0)
        this.mesh.rotation.set(0, Math.PI * 0.1, 0)
        this.scene.add(this.mesh)

        // debug
        if (this.debug.active) {
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'x').min(0).max(1).step(0.01).name("PositionX")
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'y').min(-3).max(3).step(0.001).name("PositionY")

            // this.debugFolder.add(this.geometry.parameters.radius).min(5).max(20).step(0.01).name("radius")
        }
    }

    setAnimation() {

    }

    animate() {

    }

    update() {

    }

    mouseMove(e) {
    }
}