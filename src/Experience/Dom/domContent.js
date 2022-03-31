import Experience from "../Experience"
import { SmoothTranslate } from './smoothTranslate.js';


export default class Dom {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        // this.scene = this.experience.scene
        // this.canvas = this.experience.canvas
        // this.camera = this.experience.camera
        // this.world = this.experience.world
        // this.raycaster = this.experience.raycaster

        this.setInstance()

        this.indicationOverlay()
        this.buttonBeach()
    }

    setInstance() {
        // the section that is translating on X and Y
        this.atelierOne = document.getElementById('atelier1')
        this.atelierTwo = document.getElementById('atelier2')
        this.atelierThree = document.getElementById('atelier3')
        this.atelierFour = document.getElementById('atelier4')
        this.atelierFive = document.getElementById('atelier5')

        this.smoothTranslateOne = new SmoothTranslate({
            container: this.atelierOne,
            threshold: 1,
            useRaf: true
        })

        this.smoothTranslateTwo = new SmoothTranslate({
            container: this.atelierTwo,
            threshold: 1,
            useRaf: true
        })

        this.smoothTranslateThree = new SmoothTranslate({
            container: this.atelierThree,
            threshold: 1,
            useRaf: true
        })

        this.smoothTranslateFour = new SmoothTranslate({
            container: this.atelierFour,
            threshold: 1,
            useRaf: true
        })

        this.smoothTranslateFive = new SmoothTranslate({
            container: this.atelierFive,
            threshold: 1,
            useRaf: true
        })
    }

    indicationOverlay() {

    }

    buttonBeach() {
        document.querySelectorAll('button').forEach((element) => {
            element.onclick = () => {
                this.experience.camera.shouldMove = true
                this.removePages()
            }
        })
    }

    pageOne() {
        this.smoothTranslateOne.slide.active = true
        this.smoothTranslateOne.update()

        let adaptScreen = (- this.sizes.width + 1920) / 7000
        let diffPosition = ((0.54) * this.experience.camera.looptimePosition) - this.experience.camera.scrolledAmountFinal
        this.experience.camera.scrolledAmount += diffPosition
    }

    pageTwo() {
        this.smoothTranslateTwo.slide.active = true
        this.smoothTranslateTwo.update()

        let adaptScreen = (- this.sizes.width + 1920) / 7000
        let diffPosition = ((0.62) * this.experience.camera.looptimePosition) - this.experience.camera.scrolledAmountFinal
        this.experience.camera.scrolledAmount += diffPosition
    }

    pageThree() {
        this.smoothTranslateThree.slide.active = true
        this.smoothTranslateThree.update()
        //more zoom here 
        let adaptScreen = (- this.sizes.width + 1920) / 7000
        let diffPosition = ((0.7) * this.experience.camera.looptimePosition) - this.experience.camera.scrolledAmountFinal
        this.experience.camera.scrolledAmount += diffPosition
    }

    pageFour() {
        this.smoothTranslateFour.slide.active = true
        this.smoothTranslateFour.update()
        //more zoom here 
        let adaptScreen = (- this.sizes.width + 1920) / 13000
        let diffPosition = ((0.78) * this.experience.camera.looptimePosition) - this.experience.camera.scrolledAmountFinal
        this.experience.camera.scrolledAmount += diffPosition
    }

    pageFive() {
        this.smoothTranslateFive.slide.active = true
        this.smoothTranslateFive.update()
        // less zoom maybe 
        let adaptScreen = (- this.sizes.width + 1920) / 13000
        let diffPosition = ((0.855) * this.experience.camera.looptimePosition) - this.experience.camera.scrolledAmountFinal
        this.experience.camera.scrolledAmount += diffPosition
    }

    removePages() {
        // to remove slide on X
        this.smoothTranslateOne.slide.active = false
        this.smoothTranslateTwo.slide.active = false
        this.smoothTranslateThree.slide.active = false
        this.smoothTranslateFour.slide.active = false
        this.smoothTranslateFive.slide.active = false

        this.experience.world.parasol1.clicked = false
        this.experience.world.parasol2.clicked = false
        this.experience.world.parasol3.clicked = false
        this.experience.world.parasol4.clicked = false
        this.experience.world.parasol5.clicked = false

        // reset scroll Y for the pages
        document.body.style.height = 0 + "px"
    }

    resize() {
        this.smoothTranslateOne.resize()
        this.smoothTranslateTwo.resize()
        this.smoothTranslateThree.resize()
        this.smoothTranslateFour.resize()
        this.smoothTranslateFive.resize()
    }

    update() {

    }

    click(e) {
        if (this.experience.raycaster.raycastedObjectName == 'parasol1') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageOne()
            this.experience.world.parasol1.clicked = true
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol2') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageTwo()
            this.experience.world.parasol2.clicked = true
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol3') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageThree()
            this.experience.world.parasol3.clicked = true
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol4') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageFour()
            this.experience.world.parasol4.clicked = true
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol5') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageFive()
            this.experience.world.parasol5.clicked = true
        } else {
            this.experience.camera.shouldMove = true
            this.removePages()
        }
    }

    mouseMove(e) {

    }
}