import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {

    constructor() {

        super()

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Resize event update
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            if (this.width < 1024) { // mobile
                this.height = Math.max(this.height, window.innerHeight)
            } else {
                this.height = window.innerHeight
            }
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize') // send a message to this.sizes.on('resize')
        })
    }

}