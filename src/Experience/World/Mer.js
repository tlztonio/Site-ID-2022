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
        this.geometry = new THREE.PlaneGeometry(6, 19, 10, 160)

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
                uDebug: { value: new THREE.Vector2(-1.0, 0.0) },
                uResolution: { value: new THREE.Vector2(this.sizes.width, this.sizes.height) },
                uTime: { value: 0 },
                PI: { value: Math.PI },
            },
            // transparent: true,
            // wireframe: true
            // format: THREE.RGBAFormat
        })
        // this.material.opacity = 0.5;
        // this.alphaMode = AlphaBlend;
        // this.alphaWrite = true;
        // this.depthWrite = false;
        // material.format = THREE.RGBAFormat

        // this.material.alphaTest = 0.5

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.set(-Math.PI * 0.5, 0, 0)
        this.mesh.position.set(-4, -0.27, 0)
        // this.mesh.castShadow = true;
        // this.mesh.receiveShadow = true;
        this.scene.add(this.mesh)


        if (this.debug.active) {
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'y').min(0).max(1).step(0.001)
            this.debugFolder.add(this.material.uniforms.uDebug.value, 'x').min(-5).max(10).step(0.1)
            this.material.needsUpdate = true
        }
    }

    update() {
        this.material.uniforms.uTime.value += this.time.delta
        // console.log(this.material.uniforms.uTime.value)
    }

}