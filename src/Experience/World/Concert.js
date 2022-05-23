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
        // this.bache = this.experience.world.sceneModel.children[49]
        // this.ecran = this.experience.world.sceneModel.children[1]
        this.sceneModel = this.experience.world.sceneModel

        // console.log(this.experience.world.sceneModel)

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Concert')
        }

        this.setBache()
        this.setVideo()
    }

    setBache(){
        const bacheMaterial = new THREE.MeshBasicMaterial({ color: 0x726c5a, side: THREE.DoubleSide })
        const bache = this.sceneModel.children.filter(object => object.name === 'bache');
        bache[0].material = bacheMaterial
    }

    setVideo(){
        const video = document.getElementById('hidden-video')
        const videoTexture = new THREE.VideoTexture(video)
        videoTexture.flipY = false
        const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture })
        const ecran = this.sceneModel.children.filter(object => object.name === 'planeEcran');
        ecran[0].material = videoMaterial
    }

    update() {

    }

    mouseMove(e) {
        
    }
}