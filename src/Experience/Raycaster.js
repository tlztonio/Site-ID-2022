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

        // this.raycastedObjectClick = null
        this.raycastedObjectHover = null

        this.setInstance()

        window.addEventListener('click', (e) => {
            this.clickingRaycast(e)
        })

    }

    // Definie la camera
    setInstance() {
        this.instance = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
    }

    clickingRaycast(e) {
        this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
        this.mouse.y = - (e.clientY / this.sizes.height) * 2 + 1
        // update the picking ray with the camera and mouse position
        this.instance.setFromCamera(this.mouse, this.camera.instance)
        // calculate objects intersecting the picking ray
        const intersects = this.instance.intersectObjects(this.scene.children)

        for (let i = 0; i < intersects.length; i++) {
            this.raycastedObjectClick = intersects[0].object.name
            console.log(this.raycastedObjectClick)
        }
    }

    resize() {

    }

    update() {

    }
}