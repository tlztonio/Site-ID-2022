import Experience from "../Experience"
import * as THREE from "three"
import gsap from "gsap"

export default class Parasol {
    constructor(x, y, z, name) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.raycaster = this.experience.raycaster

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('concert')
        }

        // setup
        this.model = this.resources.items.parasolModel.scene.clone()
        this.model.name = name
        this.x = x
        this.y = y
        this.z = z

        this.setModel()
        this.setAnimation()
    }

    setModel() {
        // this.model = this.resource.scene

        this.tissu = this.model.children[1]
        //double side sur le tissu a activer que si necessaire pour l'animation
        this.tissu.traverse((o) => { if (o.isMesh) o.material.side = THREE.DoubleSide })

        this.model.position.set(this.x, this.y, this.z)
        this.model.rotation.set((Math.random() - 0.5) / 3, (Math.random() - 0.5) / 3, (Math.random() - 0.5) / 3)

        this.scene.add(this.model)
        console.log('test')
    }

    setAnimation() {

        // animation des portes qui se redefinie avec le nom de l'object raycasted
        this.closeAnimation = gsap.timeline({ paused: true })
            .to(this.tissu.scale, { y: 3.7, duration: 1, ease: 'Power4.easeInOut' }, 0)
            .to(this.tissu.scale, { x: 0.3, duration: 1, ease: 'Power4.easeInOut' }, 0)
            .to(this.tissu.scale, { z: 0.3, duration: 1, ease: 'Power4.easeInOut' }, 0)
            .to(this.tissu.position, { y: 0.85, duration: 1, ease: 'Power4.easeInOut' }, 0)
        // this.openAnimation = gsap.timeline({ paused: true })
        //     .to(this.tissu.scale, { y: 1, duration: 1, ease: 'Power4.easeInOut' }, 0)
        //     .to(this.tissu.scale, { x: 1, duration: 1, ease: 'Power4.easeInOut' }, 0)
        //     .to(this.tissu.scale, { z: 1, duration: 1, ease: 'Power4.easeInOut' }, 0)
        //     .to(this.tissu.position, { y: 1.21, duration: 1, ease: 'Power4.easeInOut' }, 0)
        // this.closeAnimation = gsap.timeline({ paused: true })
        //     .to(this.raycaster.raycastedObjectClick.object.children[0].rotation, { x: 0, duration: 0.75, ease: 'Power4.easeIn' }, 0)
        //     .to(this.raycaster.raycastedObjectClick.object.rotation, { y: 0, duration: 1, ease: 'Power4.easeInOut', delay: 0.35 }, 0)

        // if (this.raycaster.raycastedObjectClick.object.rotation.y > - Math.PI * 0.22) {
        //     // condition de la porte plutot fermée
        //     console.log('open')
        // this.closeAnimation.play()
        // } else if (this.raycaster.raycastedObjectClick.object.rotation.y < - Math.PI * 0.22) {
        //     // condition de la porte plutot ouverte
        //     console.log('close')
        //     this.closeAnimation.play()
        // }
    }

    animate() {
        if (this.raycaster.raycastedObjectName == this.model.name) {
            this.closeAnimation.play()
            this.tissu.rotation.y += 0.02
        } else {
            this.closeAnimation.reverse()
        }
    }

    update() {
        this.animate()
    }

    mouseMove(e) {
    }
}