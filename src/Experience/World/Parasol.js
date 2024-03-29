import Experience from "../Experience"
import * as THREE from "three"
import gsap from "gsap"
import { Side } from "three"

export default class Parasol {
    constructor(x, y, z, name) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.raycaster = this.experience.raycaster
        this.renderer = this.experience.renderer

        // reuse material
        if (name == "parasol1") {
            const parasolMaterial = new THREE.MeshStandardMaterial({ map: this.resources.items.textureTissu, side: THREE.DoubleSide })
            this.material = parasolMaterial
        } else {
            this.material = this.experience.world.parasol1.material
        }

        // debug
        // if (this.debug.active) {
        //     this.debugFolder = this.debug.ui.addFolder('Parasol')
        // }

        // setup
        this.model = this.resources.items.parasolModel.scene.clone()
        this.model.name = name
        this.x = x
        this.y = y
        this.z = z

        // rotation on click
        this.clicked = false

        this.setModel()
        this.setAnimation()
    }

    setModel() {
        this.tissu = this.model.children[0]
        this.baton = this.model.children[1]

        this.model.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true
                o.material = this.material
                o.receiveShadows = false
            }
        })

        this.model.position.set(this.x, this.y, this.z)
        this.model.rotation.set((Math.random() - 0.5) / 3, (Math.random() - 0.5), (Math.random() - 0.5) / 3)
        this.scene.add(this.model)
    }

    setAnimation() {
        this.closeAnimation = gsap.timeline({ paused: true })
            .to(this.tissu.scale, { y: 3, duration: 1, ease: 'Power4.easeInOut' }, 0)
            .to(this.tissu.scale, { x: 0.2, duration: 1, ease: 'Power4.easeInOut' }, 0)
            .to(this.tissu.scale, { z: 0.2, duration: 1, ease: 'Power4.easeInOut' }, 0)
            .to(this.tissu.position, { y: -0.96, duration: 1, ease: 'Power4.easeInOut' }, 0)
    }

    animate() {
        if (this.raycaster.raycastedObjectName == this.model.name) {
            this.closeAnimation.play()
            this.tissu.rotation.y += 0.005
            this.renderer.instance.shadowMap.needsUpdate = true
        } else if (this.tissu.position.y < 0) {
            this.closeAnimation.reverse()
            this.renderer.instance.shadowMap.needsUpdate = true
        }

        if (this.clicked) {
            this.tissu.rotation.y += 0.005
            this.renderer.instance.shadowMap.needsUpdate = true
        }
    }

    update() {
        this.animate()
    }

    mouseMove(e) {
    }
}