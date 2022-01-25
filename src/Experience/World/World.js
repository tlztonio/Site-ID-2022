import Experience from "../Experience"
import Environment from "./Environment"
import Couloir from "./Couloir"
import Concert from "./Concert"

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on("ready", () => {
            this.environment = new Environment()
            this.couloir = new Couloir()
            this.concert = new Concert()
        })
    }

    update() {
        if (this.couloir) {
            this.couloir.update()
        }
    }

    click(e) {
        if (this.couloir) {
            this.couloir.click(e)
        }
    }
}