import Room from "../Room.js";
import MGMain from "./MGMain.js";
export default class MiniGame7 extends MGMain {
    ctx;
    combination;
    locked;
    wheels;
    wheel;
    position;
    constructor(ctx, room) {
        super(7, room);
        this.ctx = ctx;
        this.roomId = 7;
        this.locked = true;
        this.combination = [];
        this.wheels = [];
        do {
            this.codeGenerator();
            this.generateStartPosition();
        } while (this.combination === this.wheels);
    }
    update() {
        this.lockposition();
        this.locknumber();
    }
    render() {
        this.writeTextToCanvas(`this is room` + this.roomId, 20, 200, 200);
        Room.loadNewImage('assets/img/objects/pngwing.com (2).png');
        this.wheels.forEach((value, index) => this.writeTextToCanvas(`${value}`, 20, index * 10 + 100, 200));
    }
    codeGenerator() {
        for (let i = 0; i < Room.randomNumber(0, 9); i++) {
            this.combination.push(Room.randomNumber(0, 9));
        }
        console.log(this.combination);
    }
    generateStartPosition() {
        for (let i = 0; i < this.combination.length; i++) {
            this.wheels[i] = 0;
        }
        console.log(this.wheels);
    }
    lockposition() {
        if (this.keyboard.isKeyDown(37)) {
            if (this.position === 0) {
                this.position = this.wheels.length;
            }
            else {
                this.position--;
            }
        }
        else if (this.keyboard.isKeyDown(39)) {
            if (this.position === this.wheels.length) {
                this.position = 0;
            }
            else {
                this.position++;
            }
        }
    }
    locknumber() {
        if (this.keyboard.isKeyDown(40)) {
            this.decrement(this.wheel);
            this.check();
        }
        else if (this.keyboard.isKeyDown(38)) {
            this.increment(this.wheel);
            this.check();
        }
    }
    increment(wheel) {
        if (this.wheels[wheel] === 9) {
            this.wheels[wheel] = 0;
        }
        else {
            this.wheels[wheel]++;
        }
    }
    decrement(wheel) {
        if (this.wheels[wheel] === 0) {
            this.wheels[wheel] = 9;
        }
        else {
            this.wheels[wheel]--;
        }
    }
    check() {
        if (this.combination === this.wheels) {
            this.locked = false;
        }
        else {
            this.locked = true;
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=MiniGame7.js.map