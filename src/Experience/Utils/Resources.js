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

        this.setLoaders()
        this.startLoading()

    }

    setLoaders() {
        // ajouter le loading manager ici je pense
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
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