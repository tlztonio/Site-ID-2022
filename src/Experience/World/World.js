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
        })
    }

    update() {
        if (this.sable) {
            this.sable.update()
        }
    }

    click(e) {
    }
}