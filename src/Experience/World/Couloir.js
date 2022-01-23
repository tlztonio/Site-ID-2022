import Experience from "../Experience";
import * as THREE from "three"
import gsap from "gsap"

export default class Couloir {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.raycaster = this.experience.raycaster
        this.debug = this.experience.debug

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('couloir')
        }

        // setup
        this.resource = this.experience.resources.items.couloirModel
        this.raycastedObject = this.experience.raycaster.raycastedObjectClick

        this.setModel()
        this.animation()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(0.5, 0.5, 0.5)

        this.couloirObject = this.model.children[0]
        this.porteObject = this.model.children[2]
        this.poigneeObject = this.model.children[2].children[0]

        this.scene.add(this.model)
        this.porteOuverte = false

        this.debugFolder.add(this.porteObject.rotation, 'y').min(-3).max(3).step(0.01)
    }

    animation() {
        // animation des portes et autre, peut etre transferer sur update qui se call toutes les secondes
        this.openAnimation = gsap.timeline({ paused: true })
            .to(this.poigneeObject.rotation, { z: Math.PI * 0.15, duration: 0.75, ease: 'Power4.easeIn' }, 0)
            .to(this.porteObject.rotation, { y: - Math.PI * 0.75, duration: 1, ease: 'Power4.easeInOut', delay: 0.35 }, 0)
        this.closeAnimation = gsap.timeline({ paused: true })
            .to(this.poigneeObject.rotation, { z: 0, duration: 0.75, ease: 'Power4.easeIn', delay: 0.35 }, 0)
            .to(this.porteObject.rotation, { y: 0, duration: 1, ease: 'Power4.easeInOut' }, 0)
    }

    update() {
        //animation blender a garder pour utiliser sur les humains du concert
        if ((this.raycaster.raycastedObjectClick === 'porte' || this.raycaster.raycastedObjectClick === 'poignee') && this.porteOuverte == false) {
            this.openAnimation.play()
            this.porteOuverte = true
        } else if ((this.raycaster.raycastedObjectClick === 'porte' || this.raycaster.raycastedObjectClick === 'poignee') && this.porteOuverte == true) {
            this.closeAnimation.play()
            this.porteOuverte = false
        }
    }
}