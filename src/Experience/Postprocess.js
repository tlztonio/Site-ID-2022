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
        this.resources = this.experience.resources

        this.setComposer()
        // this.resources.on("ready", ()=> {
        // this.setShader()
        // })

        this.viewMatrix = new THREE.Matrix4()
	    this.viewProjectionMatrix = new THREE.Matrix4()
        // this.sunDom = document.querySelector(".sun")
        this.aspectRatio = this.sizes.width / this.sizes.height

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
                uAspectRatio: { value: this.aspectRatio },
                uTime: { value: 0 },
                uSunCoords: { value: new THREE.Vector2(0.5,0) },
                // tLensFlare1: { value: null },
                // tLensFlare2: { value: null },
                // tLensFlare3: { value: null },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        }
        
        this.shaderPass = new ShaderPass( this.shader )
        this.composer.addPass( this.shaderPass )

        // this.shaderPass.uniforms.tLensFlare1.value = this.experience.resources.items.lensflare1
        // this.shaderPass.uniforms.tLensFlare2.value = this.experience.resources.items.lensflare2
        // this.shaderPass.uniforms.tLensFlare3.value = this.experience.resources.items.lensflare3
    }

    screenSunPos() {
        let sunPosVector = new THREE.Vector3(-8.6,2,-8.2)

        this.viewProjectionMatrix.multiplyMatrices( this.camera.instance.projectionMatrix, this.camera.instance.matrixWorldInverse )
        sunPosVector.applyMatrix4( this.viewProjectionMatrix )

        // scaling the X to get circular lens flare in shader, y is 1.0 and x is 1.something depending on the ratio
        let vectorGlsl = new THREE.Vector2(((sunPosVector.x + 1) / 2) * this.aspectRatio ,(sunPosVector.y + 1) / 2 )
        // let vectorDom = new THREE.Vector2((sunPosVector.x + 1) / 2 * this.sizes.width,(sunPosVector.y - 1) / 2 * this.sizes.height)
        // let style = 'translate(' + vectorDom.x + 'px,' +  -vectorDom.y + 'px)'

        // this.sunDom.style.transform = style
        this.shaderPass.uniforms.uSunCoords.value = vectorGlsl
    }

    resize() {
        this.composer.setSize(this.sizes.width, this.sizes.height)
        this.composer.setPixelRatio(this.sizes.pixelRatio)
        this.aspectRatio = this.sizes.width / this.sizes.height

        this.shaderPass.uniforms.uResolution.value.x = this.sizes.width
        this.shaderPass.uniforms.uResolution.value.y = this.sizes.height
        this.shaderPass.uniforms.uAspectRatio.value = this.aspectRatio
    }


    update() {
        this.composer.render()

        if (this.shaderPass) {
            this.screenSunPos()
            this.shaderPass.uniforms.uTime.value += this.time.delta
        }
    }


}