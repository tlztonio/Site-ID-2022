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
        this.camera = new Camera()
        this.raycaster = new Raycaster()
        this.renderer = new Renderer()
        this.world = new World()

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
        window.addEventListener('click', (e) => {
            this.click(e)
        })

        // Mouse move event
        window.addEventListener('mousemove', (e) => {
            this.mouseMove(e)
        })

    }

    resize() {
        // call la methode de l'objet voulu qui doit etre creer dans le script de l'objet 
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        // call la methode de l'objet voulu qui doit etre creer dans le script de l'objet 
        this.camera.update()
        this.raycaster.update()
        this.world.update()
        this.renderer.update()
    }

    click(e) {
        // this.raycaster.click(e)
        this.world.click(e)
    }

    mouseMove(e) {
        this.world.mouseMove(e)
        this.raycaster.mouseMove(e)
    }
}