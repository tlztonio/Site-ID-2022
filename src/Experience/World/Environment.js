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

        this.setSun()
        this.setSunLight()
        this.setFog()
    }

    setSun() {
        this.sun = {}
        this.sun.geometry = new THREE.SphereGeometry(0.5, 20, 12)
        this.sun.material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        this.sun.mesh = new THREE.Mesh(this.sun.geometry, this.sun.material)
        this.sun.mesh.position.set(-5, 3, -3)
        // this.scene.add(this.sun.mesh)
    }

    setFog() {
        this.blueColor = new THREE.Color(0x87CEEB)

        this.scene.background = this.blueColor
        // this.scene.fog = new THREE.Fog(this.blueColor, 3, 8)
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1.25)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.near = 1
        this.sunLight.shadow.camera.far = 20
        this.sunLight.shadow.camera.left = -10
        this.sunLight.shadow.camera.right = 6

        console.log(this.sunLight.rotation)
        // this.sunLight.shadow.camera.rotation.set(-5, 3, -3)
        this.sunLight.shadow.mapSize.set(1024, 1024)

        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-5, 3.6, -2.4)
        // this.sunLight.position.set(-5, 3, -3)
        this.sunLight.rotation.set(0, 0, 0)
        this.scene.add(this.sunLight)
        const light = new THREE.AmbientLight(0x404040) // soft white light
        this.scene.add(light)

        // Debug
        if (this.debug.active) {
            // this.helper = new THREE.DirectionalLightHelper(this.sunLight, 2)
            // this.scene.add(this.helper)
            // this.debugFolder.add(this.sunLight.position, "y", 0, 15, 0.1)
            // this.debugFolder.add(this.sunLight.position, "z", 0, 15, 0.1)
            // this.shadowHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
            // this.scene.add(this.shadowHelper)
        }
    }
}