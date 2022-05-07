import * as THREE from "three"
import Experience from "./Experience"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CompressedTextureLoader } from "three"
import { normalize } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

export default class Camera {
    constructor() {
        // Permet de recuperer les valeurs du script Experience dans celui ci avec le Singleton
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.dom = this.experience.dom

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }

        this.setInstance()
        // this.setOrbitControls()
        this.travelPath()

        //scroll
        window.scrollTo(0, 0) // reset scroll
        this.scrollTimer = 0 // a timer that lauches when the user doesnt scroll to detct inactivity

        // this.bodyHeight = document.body.clientHeight // does not work maybe because of timing but numeric value is safer
        // console.log(this.bodyHeight)
        this.scrollHeight = this.dom.bodyHeight - this.sizes.height

        this.progressPosition = 0
        this.progressLookAt = 0

        // Gestion scroll avec affichage pages 
        this.shouldMove = true

        // Gestion overlay indication
        this.hasScrolled = false

        //zoomin sur les parasols
        this.zoomPosition = 0

        // video concert
        this.concertVideo = document.getElementById('hidden-video')
        this.concertVideoPlayed = false

        this.canvas.addEventListener('wheel', () => {
            this.scrollEvent()
        })

        window.addEventListener('touchmove', (e) => {
            this.scrollTimer = 0
            this.hasScrolled = true
        })

    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 75)

        // this.instance.position.set(-3, 5, 0)
        // this.instance.position.set(-4.23, 0.42, 8.88)
        this.instance.position.set(-4.23, 0.42, -5)
        // this.instance.position.set(2, 2.25, 0)
        // this.instance.rotation.set(0, -1.25, 0)


        this.scene.add(this.instance)
        this.mouse = new THREE.Vector2()

        // debug
        if (this.debug.active) {
            this.debugFolder.add(this.instance.rotation, 'x').min(-2).max(2).step(0.001).name("RotationX")
            this.debugFolder.add(this.instance.rotation, 'y').min(-2).max(2).step(0.001).name("RotationY")
            this.debugFolder.add(this.instance.rotation, 'z').min(-2).max(2).step(0.001).name("RotationZ")
            this.debugFolder.add(this.instance.position, 'x').min(-7).max(5).step(0.01).name("PositionX")
            this.debugFolder.add(this.instance.position, 'y').min(-5).max(5).step(0.01).name("PositionY")
            this.debugFolder.add(this.instance.position, 'z').min(0).max(10).step(0.01).name("PositionZ")
        }
    }

    travelPath() {
        const positionSpline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5.1, 0.8, 9.2),
            new THREE.Vector3(0.4, 0.6, 6.4),
            new THREE.Vector3(2.7, 0.6, 3),
            new THREE.Vector3(2.7, 0.6, 0),
            new THREE.Vector3(1.5, 0.6, -2),
        ])

        const lookAtSpline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-3.2, 0.45, 7.1), // rock high
            new THREE.Vector3(-2.3, -0.15, 6.6), // rock very low
            new THREE.Vector3(-0.75, 0.35, 5.95), // sable
            new THREE.Vector3(0.4, 0.4, 4.5), // parasol
            new THREE.Vector3(1, 0.35, -1), // parasol
            new THREE.Vector3(1, 0.6, -4), // scene
        ])

        // vizualize the points of the curves
        const geometry = new THREE.BoxGeometry(0.04, 0.04, 0.04)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

        lookAtSpline.points.forEach(point => {
            this.cube = new THREE.Mesh(geometry, material)
            this.cube.position.copy(point)
            // this.scene.add(this.cube)
        })

        positionSpline.points.forEach(point => {
            this.cube = new THREE.Mesh(geometry, material)
            this.cube.position.copy(point)
            // this.scene.add(this.cube)
        })

        this.positionSplineGeometry = new THREE.TubeGeometry(positionSpline, 70, 0.1, 4, false)
        this.lookAtSplineGeometry = new THREE.TubeGeometry(lookAtSpline, 70, 0.1, 4, false)

        const material1 = new THREE.MeshBasicMaterial({ color: 0xff00ff })
        const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 })

        const positionMesh = new THREE.Mesh(this.positionSplineGeometry, material1)
        const lookAtMesh = new THREE.Mesh(this.lookAtSplineGeometry, material2)

        // this.scene.add(positionMesh)
        // this.scene.add(lookAtMesh)
    }

    travelUpdate() {
        const inactivityTime = 5000

        if (this.scrollTimer > inactivityTime && this.progressPosition < 1 && this.shouldMove) {
            // verifie l'inactivité et verifie pour ne pas ajouter du temps si le chemin est fini
            window.scroll(0, window.pageYOffset + 1)
        }

        // lerp format for scroll value in percentage
        this.progressPosition += ((window.pageYOffset / this.scrollHeight) - this.progressPosition)*0.1
        // modification of the scrollHeight according the non-lerped position value for better view on parasol
        let progressScrollHeight = this.scrollHeight / ( (window.pageYOffset / this.scrollHeight) / 1.75 + 0.425)
        this.progressLookAt += ((window.pageYOffset / progressScrollHeight) - this.progressLookAt)*0.1

        if (this.progressPosition < 0) {
            this.progressPosition = 0
            this.progressLookAt = 0
        }

        if (this.progressPosition < 0.45 && this.scrollTimer > inactivityTime && !this.hasScrolled) {
            this.dom.overlayScroll.classList.add("visible")
        } else {
            this.dom.overlayScroll.classList.remove("visible")
        }

        if (this.progressPosition > 0.55 && !this.dom.hasClicked) {
            this.dom.overlayParasol.classList.add("visible")
        } else {
            this.dom.overlayParasol.classList.remove("visible")
        }

        if (this.progressPosition > 0.9) {
            this.dom.overlayParasol.classList.remove("visible")
            this.concertVideo.play()
        } else if (this.progressPosition < 0.9) {
            this.concertVideo.pause()
        }

        if (this.progressPosition > 1) {
            this.progressPosition = 1
            this.progressLookAt = 1
        }

        const position = new THREE.Vector3()
        const positionLookAt = new THREE.Vector3()

        this.positionSplineGeometry.parameters.path.getPointAt(this.progressPosition, position)
        this.lookAtSplineGeometry.parameters.path.getPointAt(this.progressLookAt, positionLookAt)

        this.instance.position.set(position.x + this.zoomPosition, position.y, position.z)
        this.instance.lookAt(positionLookAt.x + this.zoomPosition, positionLookAt.y, positionLookAt.z)
    }

    scrollEvent() {
        this.dom.removePages()

        this.experience.camera.shouldMove = true

        this.hasScrolled = true

        this.scrollTimer = 0
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    mouseMove(e) {
        this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
        this.mouse.y = - (e.clientY / this.sizes.height) * 2 + 1
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()

        this.scrollHeight = this.dom.bodyHeight - this.sizes.height

        // console.log(this.instance.position)
        // console.log(this.instance.rotation)
    }

    update() {
        if (this.positionSplineGeometry && this.lookAtSplineGeometry) {
            this.travelUpdate()
        }

        if (this.progressPosition < 1) {
            this.scrollTimer += this.time.delta
        }

        if (this.shouldMove == false && this.sizes.width > 1400) {
            // normalize zoom to remove it for first parasol
            this.zoomPosition += (-0.4 - (this.progressPosition - 0.56) * 2.5 - this.zoomPosition) * 0.08
        } else if (this.shouldMove == false && this.sizes.width < 1400) {
            this.zoomPosition += (-0.2 - (this.progressPosition - 0.56) * 2.5 - this.zoomPosition) * 0.08
        } else {
            this.zoomPosition += (0 - this.zoomPosition) * 0.08
        }

        // this.controls.update()
    }
}