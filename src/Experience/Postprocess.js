import * as THREE from "three"
import Experience from "./Experience"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

export default class Postprocess {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer

        this.setInstance()
    }

    setInstance() {
        this.composer = new EffectComposer( this.renderer )

    }

    resize() {

    }


    update() {
        this.composer.render()
    }


}