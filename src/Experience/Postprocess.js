import * as THREE from "three"
import Experience from "./Experience"

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import fragmentShader from "./shaders/Lensflare/fragment.glsl"
import vertexShader from "./shaders/Lensflare/vertex.glsl"

export default class Postprocess {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer
        this.time = this.experience.time
        this.environment = this.experience.world.environment

        this.setComposer()
        this.setShader()
    }

    setComposer() {
        this.composer = new EffectComposer( this.renderer.instance )
        this.composer.setSize(this.sizes.width, this.sizes.height)
        this.composer.setPixelRatio(this.sizes.pixelRatio)

        this.renderPass = new RenderPass( this.scene, this.camera.instance )
        this.composer.addPass( this.renderPass )

    }

    setShader(){
        this.shader = {
            uniforms:
            {
                tDiffuse: { value: null },
                uResolution: { value: new THREE.Vector2(this.sizes.width, this.sizes.height) },
                uTime: { value: 0 },
                uSunpos: { value: new THREE.Vector2(0, 0) },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        }
        this.shaderPass = new ShaderPass(this.shader)
        this.composer.addPass(this.shaderPass)

    }

    createVector(x, y, z, width, height) {
        let vector = new THREE.Vector3(-5, 3.6, -2.4)
        let viewMatrix = new THREE.Matrix4()
	    let viewProjectionMatrix = new THREE.Matrix4()
        // console.log(this.experience.world.environment.sunLight)

        // vector.setFromMatrixPosition( this.environment.sunLight.matrixWorld )
        vector.applyMatrix4( viewProjectionMatrix )

        return vector
    }

    resize() {
        this.composer.setSize(this.sizes.width, this.sizes.height)
        this.composer.setPixelRatio(this.sizes.pixelRatio)

        this.shader.uniforms.uResolution.value.x = this.sizes.width 
        this.shader.uniforms.uResolution.value.y = this.sizes.height
    }


    update() {
        this.composer.render()
        this.shader.uniforms.uTime.value += this.time.delta
        this.shader.uniforms.uSunpos.value = this.createVector()
    }


}