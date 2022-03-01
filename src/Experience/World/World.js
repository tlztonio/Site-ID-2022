import Experience from "../Experience"
import Environment from "./Environment"
import Postprocess from "./Postprocess"
import Sable from "./Sable"
import Parasol from "./Parasol"
import Mer from "./Mer"
import Rocks from "./Rocks"
import Nuages from "./Nuages"
import Concert from "./Concert"

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on("ready", () => {
            this.environment = new Environment()
            // this.postProcess = new Postprocess()
            this.sable = new Sable()
            this.mer = new Mer()
            this.rocks = new Rocks()
            this.nuages = new Nuages()
            this.parasol1 = new Parasol(0, 0, 2.75, 'parasol1')
            this.parasol2 = new Parasol(0, 0, 1.5, 'parasol2')
            this.parasol3 = new Parasol(0, 0, 0.25, 'parasol3')
            this.parasol4 = new Parasol(0, 0, -1, 'parasol4')
            this.parasol = [this.parasol1, this.parasol2, this.parasol3, this.parasol4]
            this.parasolModels = [this.parasol1.model, this.parasol2.model, this.parasol3.model, this.parasol4.model]
            this.concert = new Concert()
        })
    }

    update() {
        if (this.postProcess) {
            this.postProcess.update()
        }
        if (this.sable) {
            this.sable.update()
        }
        if (this.mer) {
            this.mer.update()
        }
        if (this.parasol) {
            this.parasol.forEach((e) => {
                e.update()
            })
        }
    }

    click(e) {
    }

    mouseMove(e) {
    }
}