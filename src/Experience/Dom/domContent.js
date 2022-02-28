import Experience from "../Experience"
import gsap from 'gsap'

export default class Dom {
    constructor() {
        // Permet de recuperer les valeurs du script Experience dans celui ci avec le Singleton
        this.experience = new Experience()
        // this.sizes = this.experience.sizes
        // this.scene = this.experience.scene
        // this.canvas = this.experience.canvas
        this.camera = this.experience.camera
        // this.world = this.experience.world
        // this.raycaster = this.experience.raycaster

        this.setInstance()

        this.indicationOverlay()
        // this.pageOne()
        // this.pageTwo()
        // this.pageThree()
        // this.pageFour()


    }

    setInstance() {
        this.atelierOne = document.getElementById('atelier1')
        this.atelierTwo = document.getElementById('atelier2')
        this.atelierThree = document.getElementById('atelier3')
        this.atelierFour = document.getElementById('atelier4')
    }

    indicationOverlay() {

    }

    pageOne() {
        this.atelierOne.style.transform = 'translateX(0)'
    }

    pageTwo() {
        this.atelierTwo.style.transform = 'translateX(0)'
    }

    pageThree() {
        this.atelierThree.style.transform = 'translateX(0)'
    }

    pageFour() {
        this.atelierFour.style.transform = 'translateX(0)'
    }

    removePages() {
        this.atelierOne.style.transform = 'translateX(-100%)'
        this.atelierTwo.style.transform = 'translateX(-100%)'
        this.atelierThree.style.transform = 'translateX(-100%)'
        this.atelierFour.style.transform = 'translateX(-100%)'
    }

    resize() {

    }

    update() {

    }

    click(e) {
        if (this.experience.raycaster.raycastedObjectName == 'parasol1') {
            this.removePages()
            this.pageOne()
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol2') {
            this.removePages()
            this.pageTwo()
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol3') {
            this.removePages()
            this.pageThree()
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol4') {
            this.removePages()
            this.pageFour()
        }
    }

    mouseMove(e) {

    }
}