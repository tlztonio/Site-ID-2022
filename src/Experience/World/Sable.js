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
        this.geometry = new THREE.PlaneGeometry(7, 19, 70, 240)


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
                    uDebug: { value: new THREE.Vector3(0.11, 0.93, 0.3) },
                    uTime: { value: 0 },
                },
            ]),
            lights: true,
        })
        // this.material.uniforms.uStageShadow.value = this.stageShadow

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.set(-Math.PI * 0.5, 0, 0)
        this.mesh.position.set(0.3, 0, 0)
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh)

        if (this.debug.active) {
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'y').min(0).max(2).step(0.01).name('PositionY')
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'x').min(0).max(1).step(0.01).name('PositionX')
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'z').min(0).max(1).step(0.01).name('PositionZ')
            // this.debugFolder.add(this.material.uniforms.uDebug2.value, 'y').min(0).max(1).step(0.01).name('StretchY')
            // this.debugFolder.add(this.material.uniforms.uDebug2.value, 'x').min(0).max(1).step(0.01).name('StretchX')
            // this.debugFolder.add(this.material.uniforms.uDebug2.value, 'z').min(0).max(1).step(0.01).name('StretchZ')
            this.material.needsUpdate = true
        }
    }

    update() {
        this.material.uniforms.uTime.value += this.time.delta
    }
}