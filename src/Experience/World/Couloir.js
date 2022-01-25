import Experience from "../Experience"
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
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(0.5, 0.5, 0.5)

        this.scene.add(this.model)
        this.porteOuverte = false

        if (this.debug.active) {
            // this.debugFolder.add(this.porteObject.rotation, 'y').min(-3).max(3).step(0.01)
        }
    }

    animationPortes() {
        let rotationPoignee
        // definition du sens de rotation de la poignee en fonction de sa position 
        // si x superieur alors elle est a droite sinon elle est a gauche 
        if (this.raycaster.raycastedObjectClick.object.position.x > 0) {
            // condition de la porte qui est a droite
            rotationPoignee = Math.PI * 0.15
        } else {
            // condition de la porte qui est a gauche
            rotationPoignee = - Math.PI * 0.15
        }

        // animation des portes qui se redefinie avec le nom de l'object raycasted
        this.openAnimation = gsap.timeline({ paused: true })
            .to(this.raycaster.raycastedObjectClick.object.children[0].rotation, { x: rotationPoignee, duration: 0.75, ease: 'Power4.easeIn' }, 0)
            .to(this.raycaster.raycastedObjectClick.object.rotation, { y: - Math.PI * 0.45, duration: 1, ease: 'Power4.easeInOut', delay: 0.35 }, 0)
        this.closeAnimation = gsap.timeline({ paused: true })
            .to(this.raycaster.raycastedObjectClick.object.children[0].rotation, { x: 0, duration: 0.75, ease: 'Power4.easeIn' }, 0)
            .to(this.raycaster.raycastedObjectClick.object.rotation, { y: 0, duration: 1, ease: 'Power4.easeInOut', delay: 0.35 }, 0)

        if (this.raycaster.raycastedObjectClick.object.rotation.y > - Math.PI * 0.22) {
            // condition de la porte plutot fermée
            console.log('open')
            this.openAnimation.play()
        } else if (this.raycaster.raycastedObjectClick.object.rotation.y < - Math.PI * 0.22) {
            // condition de la porte plutot ouverte
            console.log('close')
            this.closeAnimation.play()
        }
    }

    // animationCamera() {
    //     gsap.to(container, {
    //         y: () => -(height - document.documentElement.clientHeight),
    //         ease: "none",
    //         scrollTrigger: {
    //             trigger: document.viewport,
    //             start: "top top",
    //             end: "bottom bottom",
    //             scrub: 1,
    //             invalidateOnRefresh: true
    //         }
    //     })
    // }

    update() {

    }

    click(e) {
        if (this.raycaster.raycastedObjectClick.name.lastIndexOf("porte", 0) === 0) {
            this.animationPortes()
        }
    }
}