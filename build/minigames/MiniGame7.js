<<<<<<< HEAD
import Room from "../Room";
export default class MiniGame7 {
    ctx;
    roomId;
    combination;
    locked;
    wheels;
    constructor(ctx) {
        this.ctx = ctx;
        this.roomId = 7;
        this.codeGenerator();
        this.generateStartPosition();
=======
import MGMain from "./MGMain.js";
export default class MiniGame7 extends MGMain {
    ctx;
    constructor(ctx, room) {
        super(7, room);
        this.ctx = ctx;
>>>>>>> 7a5bc8a12630df61406a1201cc6f8615c916d1b4
    }
    update() {
    }
    render() {
        this.writeTextToCanvas(`this is room` + this.roomId, 20, 200, 200);
    }
    codeGenerator() {
        for (let i = 0; i < Math.round(Room.randomNumber(0, 9)); i++) {
            this.combination.push(Math.round(Room.randomNumber(0, 9)));
        }
    }
    generateStartPosition() {
        this.combination.forEach((index) => this.wheels.push(0));
        console.log(this.wheels);
    }
    combinationLock = {
        combination: 1618,
        locked: true,
        wheels: [0, 0, 0, 0],
        increment: function (wheel) {
            if (this.wheels[wheel] === 9) {
                this.wheels[wheel] = 0;
            }
            else {
                this.wheels[wheel]++;
            }
        },
        decrement: function (wheel) {
            if (this.wheels[wheel] === 0) {
                this.wheels[wheel] = 9;
            }
            else {
                this.wheels[wheel]--;
            }
        },
        check: function () {
            if (this.combination === parseInt(this.wheels.join(''))) {
                this.locked = false;
            }
            else {
                this.locked = true;
            }
        },
        spin: function () {
            for (let i = 0; i < 4; i++) {
                this.wheels[i] = Room.randomNumber(10, -1);
            }
        }
    };
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=MiniGame7.js.map