import Experience from "../Experience"
import * as THREE from "three"
import gsap from "gsap"

export default class Rocks {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        // this.raycaster = this.experience.raycaster

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Rocks')
        }

        // setup
        this.model = this.resources.items.textModel.scene

        this.setModel()
        // this.setAnimation()
    }

    setModel() {

        this.model.position.set(-4.75, -0.31, 0)
        this.model.scale.set(0.05, 0.05, 0.05)
        this.model.rotation.set(0.3, -0.5, 0.4)

        this.scene.add(this.model)
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