import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {

    constructor() {

        super()

        //Setup
        this.width = window.innerWidth // full viewport experience
        this.height = window.innerHeight // full viewport experience
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Resize event update
        window.addEventListener('resize', () => {
            this.width = window.innerWidth // full viewport experience
            this.height = window.innerHeight // full viewport experience
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize') // send a message to this.sizes.on('resize')
        })

        // console.log(this)

    }

}