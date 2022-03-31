import EventEmitter from "./EventEmitter"
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Resources extends EventEmitter {
    // Pour load des trucs c'est ici, pensez a mettre le path, type et name dans sources.js
    // Les loaders sont ici, on peut rajouter d'autres Loaders ici

    constructor(sources) {

        super()

        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoadingManager()
        this.setDomLoader()
        this.setLoaders()
        this.startLoading()
    }

    setLoadingManager() {
        // const loadingBarElement = document.querySelector('.loading-bar')
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () => {
                // console.log('finito')
            },
            // Progress
            (itemUrl, itemsLoaded, itemsTotal) => {
                this.threeProgressRatio = itemsLoaded / itemsTotal
                // console.log(this.threeProgressRatio)
                // loadingBarElement.style.transform = `scaleX(${progressRatio})`
                // document.getElementById("loading-number").innerHTML = Math.round(progressRatio * 100)
            }
        )
    }

    setDomLoader() {
        let imgsCollection = document.images
        let imgs = [...imgsCollection]
        console.log('images :' + imgs)
        let len = imgs.length
        let counter = 0
        // let bar = document.getElementById("bar"),
        this.number = document.getElementById("number")
        this.numberContainer = document.querySelector(".loader__number")
        let loaderContainer = document.querySelector(".loader")
        // let loaderElement = document.querySelector(".loader")

        this.domProgressRatio = 1


        const incrementCounter = () => {
            counter++;
            this.domProgressRatio = counter / len
        }

        imgs.forEach(function (img) {
            if (img.complete) {
                incrementCounter()
            } else {
                img.addEventListener("load", incrementCounter, false)
            }
        })


        this.numberUpdate = 0
        this.loadingDone = false
        // get the inner width of the loader the padding is 3.5 em two times moins la taille du texte
        this.widthTranslate = window.innerWidth - 3.5 * 16 * 2 - 19 * 16

        const updatePercent = () => {
            this.progressRatio = (this.domProgressRatio + this.threeProgressRatio) / 2
            if (this.progressRatio > 0) {
                this.numberUpdate += (this.progressRatio - this.numberUpdate) * 0.3 //classic lerp
                this.number.innerHTML = 2001 + Math.round(this.numberUpdate * 21)
                this.position = (this.progressRatio * this.widthTranslate / (19 * 16) * 100).toFixed(2)
            }
            if (this.numberUpdate > 0.999) {
                this.loadingDone = true
                setTimeout(() => { loaderContainer.classList.add('done') }, 1300)
                clearInterval(interval)
            }
        }
        let interval = setInterval(updatePercent, 70)
    }

    resize() {
        this.widthTranslate = window.innerWidth - 3.5 * 16 * 2 - 19 * 16
        this.position = (this.progressRatio * this.widthTranslate / (19 * 16) * 100).toFixed(2)
        this.update()
    }

    update() {
        this.numberContainer.style.transform = "translateX(" + this.position + "%)"
    }

    setLoaders() {
        // ajouter le loading manager ici je pense
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)
    }

    startLoading() {
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file

        this.loaded++

        if (this.loaded === this.toLoad) {
            console.log("finished loading")
            // en mettant un trigger on peut faire un listener on ready 
            this.trigger("ready")
        }
    }
}