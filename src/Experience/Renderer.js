import * as THREE from "three"
import Experience from "./Experience"

export default class Renderer {
    constructor() {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera

        // Toujours le meme nom de fonction pour initier l'element traité par le Script
        this.setInstance()

    }

    setInstance() {

        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            // antialias : true
            // alpha: true,
        })

        // A commenter pour les perfs donc on garde au cas ou
        // this.instance.physicallyCorrectLights = true
        // this.instance.outputEncoding = THREE.sRGBEncoding
        // this.instance.toneMapping = THREE.CineonToneMapping
        // this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.autoUpdate = false
        this.instance.shadowMap.needsUpdate = true
        // this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#ffffff')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }


    update() {
        this.instance.render(this.scene, this.camera.instance)
    }


}