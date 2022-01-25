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
        this.setEnvironmentMap()
    }

    setSunLight() {
        this.sunLight = new THREE.PointLight('#ffffff', 2)
        // this.sunLight.castShadow = true
        // this.sunLight.shadow.camera.far = 15
        // this.sunLight.shadow.mapSize.set(1024, 1024)
        // this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(0, 8, - 1.25)
        this.scene.add(this.sunLight)

        // Debug
        if (this.debug.active) {
            this.helper = new THREE.PointLightHelper(this.sunLight, 3)
            this.scene.add(this.helper)
            this.debugFolder.add(this.sunLight.position, "y", 0, 15, 0.1)
        }
    }

    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.texture.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterials()

        if (this.debug.active) {
            this.debugFolder
                .add(this.environmentMap, 'intensity', 0, 4)
                .name('envMapIntensity')
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}