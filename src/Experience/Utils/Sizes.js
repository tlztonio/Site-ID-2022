import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {

    constructor() {

        super()

        //Setup
        // if (window.innerWidth < 950) {
        //     this.width = window.innerWidth
        //     this.height = window.innerHeight / (3.0 - this.width * 0.001)
        // } else {
        //     this.width = window.innerWidth / 2
        //     this.height = window.innerHeight
        // }
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Resize event update
        window.addEventListener('resize', () => {
            // if (window.innerWidth < 950) {
            //     this.width = window.innerWidth
            //     this.height = window.innerHeight / (3.0 - this.width * 0.001)
            // } else {
            //     this.width = window.innerWidth / 2
            //     this.height = window.innerHeight
            // }
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize') // send a message to this.sizes.on('resize')
        })
        // console.log(this)
    }

}