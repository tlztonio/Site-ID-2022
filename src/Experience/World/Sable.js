import Experience from "../Experience"
import * as THREE from "three"
import gsap from "gsap"
import fragmentShader from "../shaders/Sable/fragment.glsl"
import vertexShader from "../shaders/Sable/vertex.glsl"
import { mergeUniforms } from 'three/src/renderers/shaders/UniformsUtils.js'
import { UniformsLib } from 'three/src/renderers/shaders/UniformsLib.js'
import { Color, MeshStandardMaterial } from "three"

export default class Sable {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        // this.raycaster = this.experience.raycaster
        this.debug = this.experience.debug
        this.time = this.experience.time


        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('sable')
        }

        // setup
        this.setInstance()
    }

    setInstance() {
        this.geometry = new THREE.PlaneGeometry(6, 19, 70, 240)


        const count = this.geometry.attributes.position.count
        const randoms = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            randoms[i] = Math.random()
        }

        this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: mergeUniforms([
                UniformsLib.lights,
                {
                    uDebug: { value: new THREE.Vector2(-1.0, 0.0) },
                    uTime: { value: 0 },
                },
            ]),
            lights: true,
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.set(-Math.PI * 0.5, 0, 0)
        this.mesh.position.set(0.65, 0, 0)
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh)

        if (this.debug.active) {
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'y').min(-2).max(2).step(0.001)
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'x').min(-5).max(5).step(0.01)
            this.material.needsUpdate = true
        }
    }

    update() {
        this.material.uniforms.uTime.value += this.time.delta
    }
}