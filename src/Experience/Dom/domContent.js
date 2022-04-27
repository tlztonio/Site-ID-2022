import Experience from "../Experience"
import { SmoothTranslate } from './smoothTranslate.js';


export default class Dom {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes

        this.bodyHeight = 5000

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

        // to disable scroll when hover page
        const atelierArray = [this.atelierOne, this.atelierTwo, this.atelierThree, this.atelierFour, this.atelierFive]
        atelierArray.forEach(item => {
            item.addEventListener('mouseover', () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop
                window.onscroll = function() {
                    window.scrollTo(0, scrollTop)
                }
            })
        })
        // this.smoothTranslateOne = new SmoothTranslate({
        //     container: this.atelierOne,
        //     threshold: 1,
        //     useRaf: true
        // })
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
        // this.smoothTranslateOne.slide.active = true
        // this.smoothTranslateOne.update()
        // let adaptScreen = (- this.sizes.width + 1920) / 7000
        this.atelierOne.classList.add("active-slide")
        window.scroll(0, 0.54 * this.experience.camera.scrollHeight)
    }

    pageTwo() {
        this.atelierTwo.classList.add("active-slide")
        window.scroll(0, 0.62 * this.experience.camera.scrollHeight)
    }

    pageThree() {
        this.atelierThree.classList.add("active-slide")
        window.scroll(0, 0.7 * this.experience.camera.scrollHeight)
    }

    pageFour() {
        this.atelierFour.classList.add("active-slide")
        window.scroll(0, 0.78 * this.experience.camera.scrollHeight)
    }

    pageFive() {
        this.atelierFive.classList.add("active-slide")
        window.scroll(0, 0.855 * this.experience.camera.scrollHeight)
    }

    removePages() {
        // to remove slide on X
        this.atelierOne.classList.remove("active-slide")
        this.atelierTwo.classList.remove("active-slide")
        this.atelierThree.classList.remove("active-slide")
        this.atelierFour.classList.remove("active-slide")
        this.atelierFive.classList.remove("active-slide")

        this.experience.world.parasol1.clicked = false
        this.experience.world.parasol2.clicked = false
        this.experience.world.parasol3.clicked = false
        this.experience.world.parasol4.clicked = false
        this.experience.world.parasol5.clicked = false

        window.onscroll = function() {}
    }

    lockScroll(){
        if (window.innerWidth < 1200) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop
            window.onscroll = function() {
                window.scrollTo(0, scrollTop)
            }
        }
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
            this.lockScroll()
            this.experience.world.parasol1.clicked = true
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol2') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageTwo()
            this.lockScroll()
            this.experience.world.parasol2.clicked = true
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol3') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageThree()
            this.lockScroll()
            this.experience.world.parasol3.clicked = true
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol4') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageFour()
            this.lockScroll()
            this.experience.world.parasol4.clicked = true
        } else if (this.experience.raycaster.raycastedObjectName == 'parasol5') {
            this.experience.camera.shouldMove = false
            this.removePages()
            this.pageFive()
            this.lockScroll()
            this.experience.world.parasol5.clicked = true
        } else {
            this.experience.camera.shouldMove = true
            this.removePages()
        }
    }

    mouseMove(e) {

    }
}