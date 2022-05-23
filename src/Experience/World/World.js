import * as THREE from "three"

import Experience from "../Experience"
import Environment from "./Environment"
import Sable from "./Sable"
import Parasol from "./Parasol"
import Mer from "./Mer"
import Rocks from "./Rocks"
import Nuages from "./Nuages"
import Concert from "./Concert"

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on("ready", () => {
            this.setSceneModel()
            this.environment = new Environment()
            this.sable = new Sable()
            this.mer = new Mer()
            this.rocks = new Rocks()
            this.nuages = new Nuages()
            let init = 3.2
            let espace = 1.25
            this.parasol1 = new Parasol(0, 0, init - espace * 0, 'parasol1')
            this.parasol2 = new Parasol(0, 0, init - espace * 1, 'parasol2')
            this.parasol3 = new Parasol(0, 0, init - espace * 2, 'parasol3')
            this.parasol4 = new Parasol(0, 0, init - espace * 3, 'parasol4')
            this.parasol5 = new Parasol(0, 0, init - espace * 4, 'parasol5')
            this.parasol = [this.parasol1, this.parasol2, this.parasol3, this.parasol4, this.parasol5]
            this.parasolModels = [this.parasol1.model, this.parasol2.model, this.parasol3.model, this.parasol4.model, this.parasol5.model]
            this.concert = new Concert()
        })
    }

    setSceneModel(){
        this.sceneModel = this.resources.items.sceneModel.scene
        this.atlasTexture = this.resources.items.atlasTexture
        this.atlasTexture.flipY = false

        const atlasMaterial = new THREE.MeshStandardMaterial({ map : this.atlasTexture })

        this.sceneModel.traverse((o) => {
            if (o.isMesh) {
                o.receiveShadow = true
                o.castShadow = true
                o.material = atlasMaterial
            }
        })

        this.scene.add(this.sceneModel)
    }

    update() {
        if (this.sable) {
            this.sable.update()
        }
        if (this.mer) {
            this.mer.update()
        }
        if (this.nuages) {
            this.nuages.update()
        }
        if (this.parasol) {
            this.parasol.forEach((e) => {
                e.update()
            })
        }
    }

    click(e) {
    }

    mouseMove(e) {
    }
}