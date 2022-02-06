import * as THREE from "three"
import Experience from "../Experience"

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js'

import fragmentShader from "../shaders/Postprocess/fragment.glsl"
import vertexShader from "../shaders/Postprocess/vertex.glsl"


export default class Postprocessing {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.time = this.experience.time


        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Post Process')
        }

        this.setInstance()

    }

    setInstance() {
        this.composer = new EffectComposer(this.renderer)
        this.composer.setSize(this.sizes.width, this.sizes.height)
        this.composer.setPixelRatio(this.sizes.pixelRatio)

        this.renderPass = new RenderPass(this.scene, this.camera)
        this.composer.addPass(this.renderPass)

        this.unrealBloomPass = new UnrealBloomPass()
        this.unrealBloomPass.strength = 0.2
        this.unrealBloomPass.radius = 0.6
        this.unrealBloomPass.threshold = 0.47
        // this.composer.addPass(this.unrealBloomPass)

        this.shader = {
            uniforms:
            {
                tDiffuse: { value: null },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uTime: { value: 0 },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        }
        this.shaderPass = new ShaderPass(this.shader)
        this.composer.addPass(this.shaderPass)

        if (this.debug.active) {
            this.debugFolder.add(this.unrealBloomPass, 'strength').min(0).max(1).step(0.001)
            this.debugFolder.add(this.unrealBloomPass, 'radius').min(0).max(2).step(0.001)
            this.debugFolder.add(this.unrealBloomPass, 'threshold').min(0).max(1).step(0.001)
        }
    }

    resize() {
        // if (this.composer) {
        this.composer.setSize(this.sizes.width, this.sizes.height)
        // }
    }

    update() {
        if (this.composer) {
            this.composer.render()
        }
        this.shaderPass.material.uniforms.uTime.value += this.time.delta
    }

}