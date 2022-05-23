import * as THREE from "three"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from "./Camera"
import Raycaster from "./Raycaster"
import Renderer from "./Renderer"
import World from "./World/World"
import Resources from "./Utils/Resources"
import sources from './sources.js'
import Debug from "./Utils/Debug"
import Dom from "./Dom/domContent"
import Postprocess from "./Postprocess"

// Singleton
let instance = null

export default class Experience {

    constructor(canvas) {

        if (instance) {
            return instance
        }

        instance = this

        window.experience = this // to get acces to the class in the terminal 

        //Options
        this.canvas = canvas

        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.dom = new Dom()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.postprocess = new Postprocess()

        this.raycaster = new Raycaster()

        // Resize event
        this.sizes.on('resize', () => { // traditionnal function will lose the this context
            // resize listener form sizes with event emitter 
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })

        // Click event
        this.canvas.addEventListener('click', (e) => {
            this.click(e)
        })

        // Mouse move event
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseMove(e)
        })

    }

    resize() {
        // call la methode de l'objet voulu qui doit etre creer dans le script de l'objet 
        this.camera.resize()
        this.renderer.resize()
        this.postprocess.resize()
        this.dom.resize()
        this.resources.resize()
    }

    update() {
        this.camera.update()
        this.raycaster.update()
        this.world.update()
        this.renderer.update()
        this.postprocess.update()
        if (this.resources.loadingDone === false) {
            this.resources.update()
        }
    }

    click(e) {
        // this.raycaster.click(e)
        this.world.click(e)
        this.dom.click(e)
    }

    mouseMove(e) {
        this.world.mouseMove(e)
        this.dom.mouseMove(e)
        if (this.camera) {
            this.camera.mouseMove(e)
            this.raycaster.mouseMove(e)
        }
    }
}