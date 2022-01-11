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
    started;
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
        this.started = true;
        do {
            this.codeGenerator();
            this.generateStartPosition();
        } while (this.combination === this.wheels);
    }
    update() {
        if (this.started) {
            document.onkeydown = this.checkLocks.bind(this);
            this.started = false;
        }
        if (this.time >= 100) {
            this.time = 0;
            this.positionKeyPressed = false;
            this.numberKeyPressed = false;
        }
        this.time++;
    }
    checkLocks(e) {
        console.log(e.keyCode);
        this.lockposition(e.keyCode);
        this.locknumber(e.keyCode);
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        Room.drawImageScaled(this.ctx, 'assets/img/background/bank-room-interior-backdrop-metal-safe-door-vault-background-racks-deposit-boxes-secure-currency-storage-inside-174243488.jpg', 1, 1, 0, 35);
        this.lockImage = Room.loadNewImage('assets/img/objects/4541104.png');
        this.ctx.drawImage(this.lockImage, -20, window.innerHeight / 6);
        this.explanation();
        this.lockImage = Room.loadNewImage('assets/img/objects/pngwing.com (500).png');
        this.ctx.drawImage(this.lockImage, window.innerWidth / 3, -12);
        this.wheels.forEach((value, index) => {
            if (this.position === index) {
                this.writeTextToCanvas(`[${value}]`, 50, 997 - (index * 54.5), 513, 'center', 'green');
            }
            else {
                this.writeTextToCanvas(`${value}`, 50, 997 - (index * 54.5), 513);
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
    lockposition(keycode) {
        if (this.wheels.length !== 1) {
            if (keycode === 37) {
                if (this.position === this.wheels.length - 1) {
                    this.position = 0;
                }
                else {
                    this.position++;
                }
                this.positionKeyPressed = true;
                console.log(this.position);
            }
            else if (keycode === 39) {
                if (this.position === 0) {
                    this.position = this.wheels.length - 1;
                }
                else {
                    this.position--;
                }
                this.positionKeyPressed = true;
                console.log(this.position);
            }
        }
    }
    locknumber(keycode) {
        if (keycode === 40) {
            this.decrement(this.position);
            this.check();
            this.numberKeyPressed = true;
        }
        else if (keycode === 38) {
            this.increment(this.position);
            this.check();
            this.numberKeyPressed = true;
        }
    }
    explanation() {
        this.writeTextToCanvas(`this is room` + this.roomId, 20, window.innerWidth / 3, window.innerHeight / 1.1);
        this.writeTextToCanvas(`Try to unlock this lock`, 20, 225, 300);
        this.writeTextToCanvas(`using the arrow keys`, 20, 225, 325);
        this.writeTextToCanvas(`Arrow up = number up`, 20, 225, 400);
        this.writeTextToCanvas(`Arrow down = number down`, 20, 225, 450);
        this.writeTextToCanvas(`Arrow left = position left`, 20, 225, 500);
        this.writeTextToCanvas(`Arrow right = position right`, 20, 225, 550);
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