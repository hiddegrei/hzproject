import MGMain from "./MGMain.js";
export default class MiniGameC extends MGMain {
    ctx;
    canvas;
    started;
    r;
    e;
    g;
    n;
    b;
    o;
    q;
    attempts;
    wrong;
    wrongLetter;
    gotit;
    pass;
    constructor(ctx, room, canvas) {
        super(100, room);
        this.ctx = ctx;
        this.canvas = canvas;
        this.started = true;
        this.r = '_';
        this.e = '_';
        this.g = '_';
        this.n = '_';
        this.b = '_';
        this.o = '_';
        this.q = '_';
        this.attempts = 5;
        this.gotit = 0;
        this.wrong = ``;
    }
    update() {
        this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
        if (this.attempts <= 0) {
            this.started = false;
            this.room.miniGameFinished = true;
            this.room.answer = false;
        }
        if (this.started) {
            document.onkeydown = this.checkKey.bind(this);
            this.started = false;
        }
        if (this.r != '_' && this.e != '_' && this.g != '_' && this.n != '_' && this.b != '_' && this.o != '_' && this.q != '_') {
            this.room.miniGameFinished = true;
            this.room.answer = true;
        }
    }
    checkKey(e) {
        if (e.keyCode === 82) {
            this.r = 'R';
        }
        else if (e.keyCode === 69) {
            this.e = 'e';
        }
        else if (e.keyCode === 71) {
            this.g = 'g';
        }
        else if (e.keyCode === 78) {
            this.n = 'n';
        }
        else if (e.keyCode === 66) {
            this.b = 'b';
        }
        else if (e.keyCode === 79) {
            this.o = 'o';
        }
        else if (e.keyCode === 49) {
            this.q = '!';
        }
        else {
            this.attempts--;
            this.wrongLetter = String.fromCharCode(e.keyCode);
            this.wrong = `De letter: ${this.wrongLetter} is fout!`;
        }
    }
    render() {
        this.writeTextToCanvas(`Dit is de Grote Kluis`, 30, 50, 200);
        this.writeTextToCanvas(`Kraak de kluis met de verzamelde hints`, 20, 50, 250);
        this.writeTextToCanvas(`Verzamelde hints:`, 20, 50, 300);
        this.writeTextToCanvas(`Pogingen: ${this.attempts}`, 30, 50, 400);
        this.writeTextToCanvas("Let op je pogingen! Druk op de spatiebalk om de kamer te verlaten", 20, 50, 500);
        this.room.getHintsGame().getHint().forEach((value, index) => {
            this.writeTextToCanvas(`${value}`, 20, 200 + index * 30, 350);
        });
        this.writeTextToCanvas(`${this.r} ${this.e} ${this.g} ${this.e} ${this.n} ${this.b} ${this.o} ${this.o} ${this.g} ${this.q}`, 50, window.innerWidth / 2, window.innerHeight / 2);
        this.writeTextToCanvas(this.wrong, 20, window.innerWidth / 2, window.innerHeight / 6);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'start', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=MiniGameC.js.map