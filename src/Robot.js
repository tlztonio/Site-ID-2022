class Robot {

    constructor(name, legs) {
        this.name = name
        this.legs = legs
        console.log(`thank you creator my name is ${this.name} ans I have ${this.legs} legs.`)

        this.sayHi()
    }

    sayHi() {
        console.log(`my name is ${this.name} and I have ${this.legs} legs`)
    }
}

export default Robot