import Experience from "../Experience"
import gsap from 'gsap'

export default class Dom {
    constructor() {
        // Permet de recuperer les valeurs du script Experience dans celui ci avec le Singleton
        this.experience = new Experience()
        // this.sizes = this.experience.sizes
        // this.scene = this.experience.scene
        // this.canvas = this.experience.canvas
        // this.camera = this.experience.camera
        // this.world = this.experience.world
        // this.raycaster = this.experience.raycaster

        this.setInstance()

        this.indicationOverlay()
        // this.pageOne()
        // this.pageTwo()
        // this.pageThree()
        // this.pageFour()

        console.log("largeur d'ecran : " + window.innerWidth)

        // mine is 1920
        // 

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
        let adaptScreen = (- window.innerWidth + 1920) / 7000
        let diffPosition = ((0.56) * this.experience.camera.looptimePosition) - this.experience.camera.scrolledAmountFinal
        this.experience.camera.scrolledAmount += diffPosition
    }

    pageTwo() {
        this.atelierTwo.style.transform = 'translateX(0)'
        let adaptScreen = (- window.innerWidth + 1920) / 7000
        let diffPosition = ((0.64) * this.experience.camera.looptimePosition) - this.experience.camera.scrolledAmountFinal
        this.experience.camera.scrolledAmount += diffPosition
    }

    pageThree() {
        this.atelierThree.style.transform = 'translateX(0)'
        let adaptScreen = (- window.innerWidth + 1920) / 7000
        let diffPosition = ((0.715) * this.experience.camera.looptimePosition) - this.experience.camera.scrolledAmountFinal
        this.experience.camera.scrolledAmount += diffPosition
    }

    pageFour() {
        this.atelierFour.style.transform = 'translateX(0)'
        let adaptScreen = (- window.innerWidth + 1920) / 13000
        let diffPosition = ((0.785 + adaptScreen) * this.experience.camera.looptimePosition) - this.experience.camera.scrolledAmountFinal
        this.experience.camera.scrolledAmount += diffPosition
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
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageOne()
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol2') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageTwo()
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol3') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageThree()
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol4') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageFour()
        } else {
            this.experience.camera.shouldMove = true
            this.removePages()
        }
    }

    mouseMove(e) {

    }
}