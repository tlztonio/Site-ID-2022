import Experience from "../Experience"
import * as THREE from "three"

export default class Rocks {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.sceneModel = this.experience.world.sceneModel

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Rocks')
        }

        this.setLogoRockMaterial()
    }

    setLogoRockMaterial(){
        const rocks = this.sceneModel.children.filter(object => object.name === 'rocks');
        rocks[0].receiveShadow = false
    }

    update() {
        // this.material.uniforms.uTime.value += this.time.delta
    }

    mouseMove(e) {
    }
}