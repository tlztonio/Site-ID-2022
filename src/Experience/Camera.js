import * as THREE from "three"
import Experience from "./Experience"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CompressedTextureLoader } from "three"
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

        // debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }

        this.setInstance()
        // this.setOrbitControls()
        this.travel()
        this.travelPath()

        //scroll
        this.scrolledAmount = 0 // distance scrolled scaled with the direction 
        this.scrolledAmountFinal = 0 // distance scrolled scaled with the direction 
        this.scrollPositionOld = 0 // previous distance scrolled to get direction of scroll
        this.scrollPositionActual = 0 // actual delta of pixels
        this.scrollTimer = 0 // a timer that lauches when the user doesnt scroll to detct inactivity

        document.addEventListener('wheel', (e) => {
            this.scrollEvent(e)
        })

        // window.addEventListener('touchmove', (e) => {
        //     this.scrollEvent(e)
        // console.log(e)
        // })

        let start
        window.addEventListener('touchstart', (e) => {
            // let swipe = e.originalEvent.touches
            // start = swipe[0].pageY
            console.log(e)
            this.start = e.touches[0].clientY
        })

        window.addEventListener('touchmove', (e) => {
            // let contact = e.originalEvent.touches
            // let end = contact[0].pageY
            // let distance = end - start

            // if (distance < -30){
            console.log(e)

            this.end = e.touches[0].clientY
            // console.log(this.end)
            this.scrolledPhone = this.start - this.end
            console.log(this.scrolledPhone)
            //     .one('touchend', function () {

            //         $(this).off('touchmove touchend');
            //     })
            this.scrollEvent(e)
        })

        // Progress
        this.timeProgressPosition = 0
        this.timeProgressLookAt = 0

    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 50)

        this.instance.position.set(-4, 1.8, 8.15)
        this.instance.rotation.set(-0.8, -0.62, -0.59)

        this.scene.add(this.instance)
        this.mouse = new THREE.Vector2()

        // debug
        if (this.debug.active) {
            this.debugFolder.add(this.instance.rotation, 'x').min(-2).max(2).step(0.001).name("RotationX")
            this.debugFolder.add(this.instance.rotation, 'y').min(-2).max(2).step(0.001).name("RotationY")
            this.debugFolder.add(this.instance.rotation, 'z').min(-2).max(2).step(0.001).name("RotationZ")
            this.debugFolder.add(this.instance.position, 'x').min(-5).max(5).step(0.01).name("PositionX")
            this.debugFolder.add(this.instance.position, 'y').min(-5).max(5).step(0.01).name("PositionY")
            this.debugFolder.add(this.instance.position, 'z').min(-10).max(5).step(0.01).name("PositionZ")
        }

    }

    travel() {

        ScrollTrigger.defaults({
            immediateRender: false,
            ease: "none",
            scrub: 1
        })

        this.travelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top", // when the top of the trigger hits the top of the viewport
                end: "bottom bottom", // end after scrolling 500px beyond the start
            }
        })
            // .addLabel("toSable")
            // .to(this.instance.position, { x: 0.4, y: 3, z: 6.4 }, "toSable")
            // .to(this.instance.rotation, { x: -1.08, y: 0.08, z: 0.16 }, "toSable")
            .addLabel("toParasol")
            .to(this.instance.position, { x: 3.2, y: 0.5, z: 3 }, "toParasol")
            .to(this.instance.rotation, { x: 0, y: 1.25, z: 0 }, "toParasol")
            .addLabel("sliderParasol")
            .to(this.instance.position, { x: 3.2, y: 0.5, z: 0 }, "sliderParasol")
            .addLabel("finalScene")
            .to(this.instance.position, { x: 3.2, y: 1, z: -2 }, "finalScene")
            .to(this.instance.rotation, { x: 0, y: 0.6, z: 0 }, "finalScene")

        // this.point = new THREE.Vector3(0.4, 0, 6.4)
        // this.instance.lookAt(this.point)

        // if (this.debug.active) {
        //     this.debugFolder.add(this.point, 'x').min(-5).max(5).step(0.01).name("pointX")
        //     this.debugFolder.add(this.point, 'y').min(-5).max(5).step(0.01).name("pointY")
        //     this.debugFolder.add(this.point, 'z').min(-5).max(5).step(0.01).name("pointZ")
        // }
    }

    travelPath() {
        const positionSpline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5.25, 0.8, 8.5),
            new THREE.Vector3(0.4, 0.6, 6.4),
            new THREE.Vector3(2.7, 0.6, 3),
            new THREE.Vector3(2.7, 0.6, 0),
            new THREE.Vector3(1.5, 0.6, -2),
        ])

        const lookAtSpline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-3.1, 0.25, 7.1), // rock high
            new THREE.Vector3(-2.3, -0.25, 6.6), // rock very low
            new THREE.Vector3(-0.75, 0.2, 5.95), // sable
            new THREE.Vector3(0.4, 0.3, 5), // parasol
            new THREE.Vector3(1, 0.3, -1), // parasol
            new THREE.Vector3(1, 0.4, -4), // scene
        ])

        // vizualize the points of the curves
        const geometry = new THREE.BoxGeometry(0.04, 0.04, 0.04)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

        lookAtSpline.points.forEach(point => {
            this.cube = new THREE.Mesh(geometry, material)
            this.cube.position.copy(point)
            this.scene.add(this.cube)
        })

        positionSpline.points.forEach(point => {
            this.cube = new THREE.Mesh(geometry, material)
            this.cube.position.copy(point)
            this.scene.add(this.cube)
        })

        console.log(lookAtSpline)

        this.positionSplineGeometry = new THREE.TubeGeometry(positionSpline, 70, 0.01, 4, false)
        this.lookAtSplineGeometry = new THREE.TubeGeometry(lookAtSpline, 70, 0.01, 4, false)

        const material1 = new THREE.MeshBasicMaterial({ color: 0xff00ff })
        const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 })

        const positionMesh = new THREE.Mesh(this.positionSplineGeometry, material1)
        const lookAtMesh = new THREE.Mesh(this.lookAtSplineGeometry, material2)

        this.scene.add(positionMesh)
        this.scene.add(lookAtMesh)

    }

    travelUpdate() {
        const looptimePosition = 100000
        this.looptimeLookAt = 100000
        const inactivityTime = 100000

        if (this.scrollTimer > inactivityTime && this.progressPosition < 1) {
            // verifie l'inactivité et verifie pour ne pas ajouter du temps si le chemin est fini
            this.timeProgressPosition += this.time.delta
            this.timeProgressLookAt += this.time.delta
        }

        this.progressPosition = (this.scrolledAmountFinal + this.timeProgressPosition) / looptimePosition
        this.progressLookAt = (this.scrolledAmountFinal + this.timeProgressLookAt) / (this.looptimeLookAt / (this.progressPosition / 1.75 + 0.425))

        // console.log(this.progressLookAt)

        if (this.progressPosition < 0) {
            this.progressPosition = 0
            this.progressLookAt = 0
            this.scrolledAmountFinal = 0
            this.scrolledAmount = 0
            this.timeProgressPosition = 0
            this.timeProgressLookAt = 0
        }

        if (this.progressPosition >= 1) {
            this.progressPosition = 1
            this.progressLookAt = 1
        }

        const position = new THREE.Vector3()
        const positionLookAt = new THREE.Vector3()

        this.positionSplineGeometry.parameters.path.getPointAt(this.progressPosition, position)
        this.lookAtSplineGeometry.parameters.path.getPointAt(this.progressLookAt, positionLookAt)

        this.instance.position.copy(position)
        // this.instance.lookAt(positionLookAt.x + this.mouse.x * 0.1, positionLookAt.y + this.mouse.y * 0.1, positionLookAt.z)
        // positionLookAt.x += (this.mouse.x * 5 - positionLookAt.x) * 0.01
        // positionLookAt.y += (this.mouse.y * 5 - positionLookAt.y) * 0.01
        this.instance.lookAt(positionLookAt)

        // console.log(this.timeProgressPosition)
    }

    scrollEvent(e) {

        if (e.deltaY) {
            this.scrollPositionActual += e.deltaY
        } else {
            this.scrollPositionActual += this.scrolledPhone
        }

        if (this.scrollPositionActual > this.scrollPositionOld) {
            if (this.progressPosition < 1) {
                // prevent overflow of scroll 
                this.scrolledAmount += 1000
            }
        } else {
            this.scrolledAmount -= 1000
        }

        this.scrollPositionOld = this.scrollPositionActual
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
        console.log(this.instance.position)
        console.log(this.instance.rotation)
        console.log("progress : " + this.progressPosition)
        console.log("scrollResult : " + this.scrolledAmountFinal)
        console.log("scrollAction : " + this.scrolledAmount)
        console.log("time : " + this.timeProgressPosition)
    }

    update() {
        if (this.positionSplineGeometry && this.lookAtSplineGeometry) {
            this.travelUpdate()
        }

        if (this.progressPosition < 1) {
            this.scrollTimer += this.time.delta
        }

        this.scrolledAmountFinal += (this.scrolledAmount - this.scrolledAmountFinal) * 0.1

        // this.controls.update()
    }
}