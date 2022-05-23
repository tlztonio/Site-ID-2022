import * as THREE from "three"
import Experience from "../Experience";

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        this.setSunLight()
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1.25)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.near = 1
        this.sunLight.shadow.camera.far = 20
        this.sunLight.shadow.camera.left = -10
        this.sunLight.shadow.camera.right = 8
        // this.sunLight.shadow.camera.rotation.set(-5, 3, -3)
        this.sunLight.shadow.mapSize.set(1024, 1024)
        // this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-5, 3.6, -2.4)
        this.sunLight.rotation.set(0, 0, 0)
        this.scene.add(this.sunLight)

        const light = new THREE.AmbientLight(0x555555) // soft white light
        this.scene.add(light)

        // Debug
        if (this.debug.active) {
            this.helper = new THREE.DirectionalLightHelper(this.sunLight, 2)
            this.scene.add(this.helper)
            // this.debugFolder.add(this.sunLightObject.position, "x", -15, 0, 0.1)
            // this.debugFolder.add(this.sunLightObject.position, "y", 0, 15, 0.1)
            this.shadowHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
            this.scene.add(this.shadowHelper)
        }
    }
}