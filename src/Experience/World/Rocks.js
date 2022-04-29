import Experience from "../Experience"
import * as THREE from "three"
// import gsap from "gsap"
import fragmentShader from "../shaders/Rocks/fragment.glsl"
import vertexShader from "../shaders/Rocks/vertex.glsl"

export default class Rocks {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Rocks')
        }

        // setup
        this.model = {}
        this.model.textRock = this.resources.items.textRockModel.scene
        this.model.stairsRock = this.resources.items.stairsRockModel.scene
        this.model.logoDegresRock = this.resources.items.degresRock.scene
        this.model.logoBattleRock = this.resources.items.battleRock.scene
        this.model.logoRadioRock = this.resources.items.radioRock.scene
        this.model.logoPhotoRock = this.resources.items.photoRock.scene
        this.model.logoPhotomatonRock = this.resources.items.photomatonRock.scene

        this.setTextModel()
        this.setStairsModel()
        this.setLogosModel()
    }

    setTextModel() {
        this.model.textRock.position.set(-2.1, -0.33, 6)
        this.model.textRock.rotation.set(0.5, -1.167, 0.517)
        // this.model.text.receiveShadow = false
        // this.model.text.castShadow = true
        this.rockMaterial = new THREE.MeshStandardMaterial({ color: 0x5e5652 })

        this.model.textRock.traverse((o) => {
            if (o.isMesh) {
                o.material = this.rockMaterial
                o.castShadow = true
            }
        })

        this.scene.add(this.model.textRock)

        if (this.debug.active) {
            // this.debugFolder.add(this.model.text.rotation, 'x').min(0.5).max(1.5).step(0.001).name("RotationX")
            // this.debugFolder.add(this.model.text.rotation, 'y').min(-1.5).max(-0.5).step(0.001).name("RotationY")
            // this.debugFolder.add(this.model.text.rotation, 'z').min(0.5).max(1.5).step(0.001).name("RotationZ")
            // this.debugFolder.add(this.model.text.position, 'x').min(-6).max(10).step(0.01).name("PositionX")
            // this.debugFolder.add(this.model.text.position, 'y').min(-3).max(3).step(0.001).name("PositionY")
            // this.debugFolder.add(this.model.text.position, 'z').min(-3).max(10).step(0.01).name("PositionZ")
        }
    }

    setStairsModel() {
        this.model.stairsRock.position.set(2.6, 0, 1.1)
        this.model.stairsRock.rotation.set(0, -0.5 * Math.PI, 0)
        this.model.stairsRock.scale.set(0.4, 0.4, 0.4)

        const materialWood = new THREE.MeshStandardMaterial({
            color: 0x42291a,
        })
        const materialRock = new THREE.MeshStandardMaterial({
            color: 0x909090,
            map: this.resources.items.rockColor,
        })

        this.model.stairsRock.traverse((o) => {
            if (o.isMesh) {
                o.material = materialRock
                o.receiveShadow = true
            }
        })

        this.model.stairsRock.children[0].material = materialWood
        this.model.stairsRock.children[0].receiveShadow = true
        this.model.stairsRock.children[0].castShadow = true

        // this.geometry = new THREE.PlaneGeometry()

        // this.material = new THREE.ShaderMaterial({
        //     vertexShader: vertexShader,
        //     fragmentShader: fragmentShader,
        //     uniforms: {
        //         uDebug: { value: new THREE.Vector3(0.0, 0.0, 0.0) },
        //         uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        //         uTime: { value: 0 },
        //         PI: { value: Math.PI },
        //     },
        // })

        // this.mesh = new THREE.Mesh(this.geometry, this.material)
        // this.mesh.rotation.set(0, -Math.PI * 0.5, 0)
        // this.mesh.position.set(3.5, 0.7, 0)

        this.scene.add(this.model.stairsRock)
        // this.scene.add(this.mesh)

        if (this.debug.active) {
            // this.debugFolder.add(this.model.stairsRock.rotation, 'x').min(-5).max(5).step(0.001).name("RotationX")
            // this.debugFolder.add(this.model.stairsRock.rotation, 'y').min(-5).max(5).step(0.001).name("RotationY")
            // this.debugFolder.add(this.model.stairsRock.rotation, 'z').min(-5).max(5).step(0.001).name("RotationZ")
            // this.debugFolder.add(this.model.stairsRock.position, 'x').min(-5).max(5).step(0.001).name("PositionX")
            // this.debugFolder.add(this.model.stairsRock.position, 'y').min(-5).max(5).step(0.001).name("PositionY")
            // this.debugFolder.add(this.model.stairsRock.position, 'z').min(-5).max(5).step(0.001).name("PositionZ")
            // this.debugFolder.add(this.material.uniforms.uDebug.value, 'x').min(0).max(1).step(0.001).name("dEBUG X")
            // this.debugFolder.add(this.material.uniforms.uDebug.value, 'y').min(0).max(1).step(0.001).name("dEBUG Y")
            // this.debugFolder.add(this.material.uniforms.uDebug.value, 'z').min(0).max(1).step(0.001).name("dEBUG Z")
        }
    }

    setLogosModel() {
        // Degres
        this.model.logoDegresRock.position.set(0.07, -0.02, 3.34)
        this.model.logoDegresRock.rotation.set(0.08, 1.43, 0)
        this.model.logoDegresRock.castShadow = true

        this.model.logoDegresRock.traverse((o) => {
            if (o.isMesh) {
                o.material = this.rockMaterial
                o.castShadow = true
            }
        })

        this.scene.add(this.model.logoDegresRock)

        // Battle
        this.model.logoBattleRock.position.set(0.21, -0.008, 2.1)
        this.model.logoBattleRock.rotation.set(0, 1, 0)
        this.model.logoBattleRock.castShadow = true

        this.model.logoBattleRock.traverse((o) => {
            if (o.isMesh) {
                o.material = this.rockMaterial
                o.castShadow = true
            }
        })

        this.scene.add(this.model.logoBattleRock)

        // Radio
        this.model.logoRadioRock.position.set(0.21, -0.009, 0.8)
        this.model.logoRadioRock.rotation.set(0, 0.698, -0.162)
        this.model.logoRadioRock.castShadow = true

        this.model.logoRadioRock.traverse((o) => {
            if (o.isMesh) {
                o.material = this.rockMaterial
                o.castShadow = true
            }
        })

        this.scene.add(this.model.logoRadioRock)

        // Photo
        this.model.logoPhotoRock.position.set(0.14, 0.02, -0.51)
        this.model.logoPhotoRock.rotation.set(0, 1.8, 0.1)
        this.model.logoPhotoRock.castShadow = true

        this.model.logoPhotoRock.traverse((o) => {
            if (o.isMesh) {
                o.material = this.rockMaterial
                o.castShadow = true
            }
        })

        this.scene.add(this.model.logoPhotoRock)

        // Photomaton
        this.model.logoPhotomatonRock.position.set(0.29, 0.04, -1.65)
        this.model.logoPhotomatonRock.rotation.set(0, 1.3, -0.04)
        this.model.logoPhotomatonRock.castShadow = true

        this.model.logoPhotomatonRock.traverse((o) => {
            if (o.isMesh) {
                o.material = this.rockMaterial
                o.castShadow = true
            }
        })

        this.scene.add(this.model.logoPhotomatonRock)

        if (this.debug.active) {
            this.debugFolder.add(this.model.logoPhotomatonRock.rotation, 'x').min(-5).max(5).step(0.001).name("RotationX")
            this.debugFolder.add(this.model.logoPhotomatonRock.rotation, 'y').min(-5).max(5).step(0.001).name("RotationY")
            this.debugFolder.add(this.model.logoPhotomatonRock.rotation, 'z').min(-5).max(5).step(0.001).name("RotationZ")
            this.debugFolder.add(this.model.logoPhotomatonRock.position, 'x').min(-1).max(1).step(0.001).name("PositionX")
            this.debugFolder.add(this.model.logoPhotomatonRock.position, 'y').min(-1).max(1).step(0.001).name("PositionY")
            this.debugFolder.add(this.model.logoPhotomatonRock.position, 'z').min(-4.5).max(-1.5).step(0.001).name("PositionZ")
        }
    }

    setAnimation() {

    }

    animate() {

    }

    update() {
        // this.material.uniforms.uTime.value += this.time.delta
    }

    mouseMove(e) {
    }
}