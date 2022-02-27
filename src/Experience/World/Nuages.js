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

        this.geometry = new THREE.PlaneGeometry(50, 10, 1, 1);
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uDebug: { value: new THREE.Vector2(-1.0, 0.0) },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uTime: { value: 0 },
                PI: { value: Math.PI },
            },
            transparent: true,
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(-8, 2, 0)
        this.mesh.rotation.set(0, Math.PI * 0.5, 0)
        this.scene.add(this.mesh);

        // debug
        if (this.debug.active) {
            // this.debugFolder.add(this.model.text.rotation, 'x').min(0.5).max(1.5).step(0.001).name("RotationX")
            // this.debugFolder.add(this.model.text.rotation, 'y').min(-1.5).max(-0.5).step(0.001).name("RotationY")
            // this.debugFolder.add(this.model.text.rotation, 'z').min(0.5).max(1.5).step(0.001).name("RotationZ")
            // this.debugFolder.add(this.model.text.position, 'x').min(-6).max(10).step(0.01).name("PositionX")
            // this.debugFolder.add(this.model.text.position, 'y').min(-3).max(3).step(0.001).name("PositionY")
            // this.debugFolder.add(this.model.text.position, 'z').min(-3).max(10).step(0.01).name("PositionZ")
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