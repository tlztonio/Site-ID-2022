import Experience from "../Experience"
import Environment from "./Environment"
import Sable from "./Sable"
import Parasol from "./Parasol"

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on("ready", () => {
            this.environment = new Environment()
            this.sable = new Sable()
            this.parasol1 = new Parasol(-3, 0, 0, 'parasol1')
            this.parasol2 = new Parasol(0, 0, 0, 'parasol2')
            this.parasol3 = new Parasol(3, 0, 0, 'parasol3')
            this.parasol4 = new Parasol(6, 0, 0, 'parasol4')
            this.parasol = [this.parasol1, this.parasol2, this.parasol3, this.parasol4]
        })
    }

    update() {
        if (this.sable) {
            this.sable.update()
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
        // if (this.parasol) {
        //     this.parasol.mouseMove(e)
        // }
    }
}