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
        this.model.stairsRock = this.resources.items.stairsRockModel.scene

        this.setTextModel()
        this.setStairsModel()
        // this.setAnimation()
    }

    setTextModel() {
        // ombre sur la piere qui ne ofnctionne pas car trop proche du plane sable

        this.model.text.position.set(-2.1, -0.33, 6) // -4.713, -0.319
        this.model.text.rotation.set(0.5, -1.167, 0.517)
        // this.model.text.receiveShadow = false
        // this.model.text.castShadow = true
        const rockMaterial = new THREE.MeshStandardMaterial()

        this.model.text.traverse((o) => {
            if (o.isMesh) {
                // o.castShadow = true
                // o.receiveShadow = true
                o.material.color.set(0xffffff)
            }
        })

        this.scene.add(this.model.text)

        if (this.debug.active) {
            this.debugFolder.add(this.model.text.rotation, 'x').min(0.5).max(1.5).step(0.001).name("RotationX")
            this.debugFolder.add(this.model.text.rotation, 'y').min(-1.5).max(-0.5).step(0.001).name("RotationY")
            this.debugFolder.add(this.model.text.rotation, 'z').min(0.5).max(1.5).step(0.001).name("RotationZ")
            this.debugFolder.add(this.model.text.position, 'x').min(-6).max(10).step(0.01).name("PositionX")
            this.debugFolder.add(this.model.text.position, 'y').min(-3).max(3).step(0.001).name("PositionY")
            this.debugFolder.add(this.model.text.position, 'z').min(-3).max(10).step(0.01).name("PositionZ")
        }
    }

    setStairsModel() {

        this.model.stairsRock.position.set(2.55, 0, 1.1)// -4.75, -0.26
        this.model.stairsRock.rotation.set(0, -0.5 * Math.PI, 0)
        this.model.stairsRock.scale.set(0.4, 0.4, 0.4)

        this.scene.add(this.model.stairsRock)

        if (this.debug.active) {
            this.debugFolder.add(this.model.stairsRock.rotation, 'x').min(-5).max(5).step(0.001).name("RotationX")
            this.debugFolder.add(this.model.stairsRock.rotation, 'y').min(-5).max(5).step(0.001).name("RotationY")
            this.debugFolder.add(this.model.stairsRock.rotation, 'z').min(-5).max(5).step(0.001).name("RotationZ")
            this.debugFolder.add(this.model.stairsRock.position, 'x').min(-5).max(5).step(0.001).name("PositionX")
            this.debugFolder.add(this.model.stairsRock.position, 'y').min(-5).max(5).step(0.001).name("PositionY")
            this.debugFolder.add(this.model.stairsRock.position, 'z').min(-5).max(5).step(0.001).name("PositionZ")
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