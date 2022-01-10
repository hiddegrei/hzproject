import Room from "../Room.js";
import MGMain from "./MGMain.js";
export default class MiniGame7 extends MGMain {
    ctx;
    combination;
    locked;
    wheels;
    position;
    lockImage;
    canvas;
    time;
    positionKeyPressed;
    numberKeyPressed;
    constructor(ctx, room, canvas) {
        super(7, room);
        this.canvas = canvas;
        this.ctx = ctx;
        this.roomId = 7;
        this.locked = true;
        this.combination = [];
        this.wheels = [];
        this.position = 0;
        this.time = 0;
        this.positionKeyPressed = false;
        this.numberKeyPressed = false;
        do {
            this.codeGenerator();
            this.generateStartPosition();
        } while (this.combination === this.wheels);
    }
    update() {
        this.lockposition();
        this.locknumber();
        this.render();
        if (this.time >= 100) {
            this.time = 0;
            this.positionKeyPressed = false;
            this.numberKeyPressed = false;
        }
        this.time++;
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.explanation();
        this.lockImage = Room.loadNewImage('assets/img/objects/pngwing.com (500).png');
        this.ctx.drawImage(this.lockImage, window.innerWidth / 2, 100);
        this.wheels.forEach((value, index) => {
            if (this.position === index) {
                this.writeTextToCanvas(`[${value}]`, 50, 1317 - (index * 54.5), 635, 'center', 'green');
            }
            else {
                this.writeTextToCanvas(`${value}`, 50, 1317 - (index * 54.5), 635);
            }
        });
    }
    codeGenerator() {
        for (let i = 0; i < Room.randomNumber(1, 5); i++) {
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
        if (this.wheels.length !== 1) {
            if (this.keyboard.isKeyDown(37) && this.positionKeyPressed === false) {
                if (this.position === 0) {
                    this.position = this.wheels.length - 1;
                }
                else {
                    this.position--;
                }
                this.positionKeyPressed = true;
                console.log(this.position);
            }
            else if (this.keyboard.isKeyDown(39) && this.positionKeyPressed === false) {
                if (this.position === this.wheels.length - 1) {
                    this.position = 0;
                }
                else {
                    this.position++;
                }
                this.positionKeyPressed = true;
                console.log(this.position);
            }
        }
    }
    locknumber() {
        if (this.keyboard.isKeyDown(40) && this.numberKeyPressed === false) {
            this.decrement(this.wheels[this.position].valueOf());
            this.check();
            this.numberKeyPressed = true;
        }
        else if (this.keyboard.isKeyDown(38) && this.numberKeyPressed === false) {
            this.increment(this.wheels[this.position].valueOf());
            this.check();
            this.numberKeyPressed = true;
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
        console.log(`increment: ${wheel}`);
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