import * as THREE from "three"
import Experience from "./Experience"

export default class Raycaster {
    constructor() {
        // Permet de recuperer les valeurs du script Experience dans celui ci avec le Singleton
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera
        this.world = this.experience.world

        // this.raycastedObject = {}

        this.setInstance()
    }

    // Definie la camera
    setInstance() {
        this.instance = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
    }

    hoverRaycast(e) {
        this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
        this.mouse.y = - (e.clientY / this.sizes.height) * 2 + 1
        // update the picking ray with the camera and mouse position
        this.instance.setFromCamera(this.mouse, this.camera.instance)
        // calculate objects intersecting the picking ray

        // use group without sea for better performance
        const intersects = this.instance.intersectObjects(this.world.parasolModels)

        // reset value
        this.raycastedObjectName = "nothing"

        for (let i = 0; i < intersects.length; i++) {
            this.raycastedObjectName = intersects[0].object.parent.name
        }
    }

    resize() {

    }

    update() {

    }

    click(e) {

    }

    mouseMove(e) {
        if (this.world.parasolModels) {
            this.hoverRaycast(e)
        }
    }
}