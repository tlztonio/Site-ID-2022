import Experience from "../Experience"
import * as THREE from "three"

export default class Concert {
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
            this.debugFolder = this.debug.ui.addFolder('Concert')
        }

        // setup
        this.model = {}
        this.model.concert = this.resources.items.concertModel.scene

        this.setModel()
        // this.setAnimation()
    }

    setModel() {

        this.model.concert.position.set(0.5, 0, -7) // -4.713, -0.319
        this.model.concert.rotation.set(0, -Math.PI * 0.5, 0)
        // this.model.text.receiveShadow = false
        // this.model.text.castShadow = true
        // const rockMaterial = new THREE.MeshStandardMaterial()

        // this.model.concert.traverse((o) => {
        //     if (o.isMesh) {
        //         // o.castShadow = true
        //         // o.receiveShadow = true
        //         o.material.color.set(0xffffff)
        //     }
        // })
        this.model.concert.children[12].material.side = THREE.DoubleSide

        this.scene.add(this.model.concert)

        if (this.debug.active) {
            this.debugFolder.add(this.model.concert.rotation, 'x').min(0.5).max(1.5).step(0.001).name("RotationX")
            this.debugFolder.add(this.model.concert.rotation, 'y').min(-1.5).max(-0.5).step(0.001).name("RotationY")
            this.debugFolder.add(this.model.concert.rotation, 'z').min(0.5).max(1.5).step(0.001).name("RotationZ")
            this.debugFolder.add(this.model.concert.position, 'x').min(-6).max(10).step(0.01).name("PositionX")
            this.debugFolder.add(this.model.concert.position, 'y').min(-3).max(3).step(0.001).name("PositionY")
            this.debugFolder.add(this.model.concert.position, 'z').min(-8).max(0).step(0.01).name("PositionZ")
        }
    }

    update() {
    }

    mouseMove(e) {
    }
}