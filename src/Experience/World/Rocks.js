import Experience from "../Experience"
import * as THREE from "three"
import gsap from "gsap"

export default class Rocks {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        // this.raycaster = this.experience.raycaster

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Rocks')
        }

        // setup
        this.model = {}
        this.model.text = this.resources.items.textRockModel.scene
        this.model.smallRock = this.resources.items.smallRock1Model.scene

        this.setTextModel()
        // this.setRocksModel()
        // this.setAnimation()
    }

    setTextModel() {

        this.model.text.position.set(-2.1, -0.33, 6) // -4.713, -0.319
        this.model.text.rotation.set(0.5, -1.167, 0.517)
        this.model.text.castShadows = true

        this.scene.add(this.model.text)

        // debug
        if (this.debug.active) {
            this.debugFolder.add(this.model.text.rotation, 'x').min(0.5).max(1.5).step(0.001).name("RotationX")
            this.debugFolder.add(this.model.text.rotation, 'y').min(-1.5).max(-0.5).step(0.001).name("RotationY")
            this.debugFolder.add(this.model.text.rotation, 'z').min(0.5).max(1.5).step(0.001).name("RotationZ")
            this.debugFolder.add(this.model.text.position, 'x').min(-6).max(10).step(0.01).name("PositionX")
            this.debugFolder.add(this.model.text.position, 'y').min(-3).max(3).step(0.001).name("PositionY")
            this.debugFolder.add(this.model.text.position, 'z').min(-3).max(10).step(0.01).name("PositionZ")
        }
    }

    setRocksModel() {

        this.model.smallRock.position.set(-4.73, -0.33, -0.5)// -4.75, -0.26
        this.model.smallRock.rotation.set(0.38, -1.13, 0.38)

        this.scene.add(this.model.smallRock)

        // debug
        if (this.debug.active) {
            this.debugFolder.add(this.model.smallRock.rotation, 'x').min(0).max(3).step(0.001).name("RotationX")
            this.debugFolder.add(this.model.smallRock.rotation, 'y').min(-3).max(3).step(0.001).name("RotationY")
            this.debugFolder.add(this.model.smallRock.rotation, 'z').min(0).max(3).step(0.001).name("RotationZ")
            this.debugFolder.add(this.model.smallRock.position, 'x').min(-6).max(-4).step(0.001).name("PositionX")
            this.debugFolder.add(this.model.smallRock.position, 'y').min(-3).max(3).step(0.001).name("PositionY")
            this.debugFolder.add(this.model.smallRock.position, 'z').min(-3).max(0).step(0.001).name("PositionZ")
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