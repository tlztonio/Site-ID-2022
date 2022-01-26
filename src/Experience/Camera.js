import * as THREE from "three"
import Experience from "./Experience"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    constructor() {
        // Permet de recuperer les valeurs du script Experience dans celui ci avec le Singleton
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera

        this.setInstance()
        this.setOrbitControls()

        window.addEventListener('mousemove', (e) => {
            this.mouseMouve(e)
        })
    }

    // Definie la camera
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0, 3, 5)
        this.scene.add(this.instance)
        this.mouse = new THREE.Vector2()
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    mouseMouve(e) {
        this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
        this.mouse.y = - (e.clientY / this.sizes.height) * 2 + 1
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
        // this.instance.position.z -= 0.02
        // this.instance.rotation.y += (this.mouse.x * -0.25 - this.instance.rotation.y) * 0.02
        // this.instance.rotation.x += (this.mouse.y * 0.25 - this.instance.rotation.x) * 0.02
    }
}