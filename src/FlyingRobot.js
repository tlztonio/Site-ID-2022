import Robot from "./Robot"

class FlyingRobot extends Robot { // inheritence
    sayHi() {
        console.log("something else")
    }
    takeOff() {
        console.log(`youpi ${this.name} is flying`)
    }
    land() {
        console.log(`wow ${this.name} just landed`)
    }
}

export default FlyingRobot