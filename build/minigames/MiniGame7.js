import Room from "../Room.js";
import MGMain from "./MGMain.js";
export default class MiniGame7 extends MGMain {
    ctx;
    combination;
    locked;
    wheels;
    wheel;
    position;
    lockImage;
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
        this.render();
    }
    render() {
        this.explanation();
        this.lockImage = Room.loadNewImage('assets/img/objects/pngwing.com (500).png');
        this.ctx.drawImage(this.lockImage, window.innerWidth / 2, 100);
        this.wheels.forEach((value, index) => {
            this.writeTextToCanvas(`${value}`, 50, 1317 - (index * 54.5), 635);
        });
    }
    codeGenerator() {
        for (let i = 0; i < Room.randomNumber(0, 5); i++) {
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
    explanation() {
        this.writeTextToCanvas(`this is room` + this.roomId, 20, 200, 200);
        this.writeTextToCanvas(`Try to unlock this lock using the arrow keys`, 20, 200, 300);
        this.writeTextToCanvas(`Arrow up = number up`, 20, 200, 400);
        this.writeTextToCanvas(`Arrow down = number down`, 20, 200, 450);
        this.writeTextToCanvas(`Arrow left = position left`, 20, 200, 500);
        this.writeTextToCanvas(`Arrow right = position right`, 20, 200, 550);
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