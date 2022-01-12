import Game from "../Game.js";
import Room from "../Room.js";
import MGMain from "./MGMain.js";
export default class MiniGame6 extends MGMain {
    canvas;
    ctx;
    fullFingerprint;
    partFingerprint;
    randomNumber;
    started;
    titelText;
    color;
    size;
    image;
    constructor(ctx, room, canvas) {
        super(6, room);
        this.canvas = canvas;
        this.ctx = ctx;
        this.fullFingerprint = [Room.loadNewImage('assets/img/fingerPrints/resized-fingerprint-1382652_1920.jpg'), Room.loadNewImage('assets/img/fingerPrints/resized-detective-fingerprints-print.png'), Room.loadNewImage('assets/img/fingerPrints/resized-istockphoto-534450004-612x612.jpg')];
        this.partFingerprint = [Room.loadNewImage('assets/img/fingerPrints/detective-fingerprints-arch.png'), Room.loadNewImage('assets/img/fingerPrints/detective-fingerprints-loop.png'), Room.loadNewImage('assets/img/fingerPrints/detective-fingerprints-whorl.png')];
        this.randomNumber = Room.randomNumber(0, 2);
        this.started = true;
        this.titelText = 'Vergelijk de vingerafdruk met de kleinere en kies welke het meest overeenkomt';
        this.color = 'red';
        this.size = 20;
        this.image = Game.loadNewImage("./assets/img/background/password2.jpg");
    }
    update() {
        if (this.started) {
            document.onkeydown = this.checkLocks.bind(this);
            this.started = false;
        }
    }
    render() {
        this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(`Dit is kamer ` + this.roomId, 20, 200, 200);
        this.writeTextToCanvas(this.titelText, this.size, window.innerWidth / 2, window.innerHeight / 8, 'center', this.color);
        this.loadFingerPrints();
        this.writeTextToCanvas(`Pijltjestoets naar links <`, 20, window.innerWidth / 1.7, window.innerHeight / 4 * (0 + 1.2));
        this.writeTextToCanvas(`Pijltjestoets omhoog ^`, 20, window.innerWidth / 1.7, window.innerHeight / 4 * (1 + 1.2));
        this.writeTextToCanvas(`Pijltjestoets naar rechts >`, 20, window.innerWidth / 1.7, window.innerHeight / 4 * (2 + 1.2));
    }
    checkLocks(e) {
        this.checkKeyboard(e.keyCode);
    }
    loadFingerPrints() {
        this.ctx.drawImage(this.fullFingerprint[this.randomNumber], window.innerWidth / 3, window.innerHeight / 3);
        this.partFingerprint.forEach((value, index) => this.ctx.drawImage(value, window.innerWidth / 1.5, window.innerHeight / 4 * (index + 1)));
    }
    checkKeyboard(keycode) {
        if (keycode === 37 && this.randomNumber === 2) {
            this.titelText = 'Goed geantwoord';
            this.color = 'green';
            this.size = 30;
            setTimeout(this.answer.bind(this), 3000);
        }
        else if (keycode === 38 && this.randomNumber === 1) {
            this.titelText = 'Goed geantwoord';
            this.color = 'green';
            this.size = 30;
            setTimeout(this.answer.bind(this), 3000);
        }
        else if (keycode === 39 && this.randomNumber === 0) {
            this.titelText = 'Goed geantwoord';
            this.color = 'green';
            this.size = 30;
            setTimeout(this.answer.bind(this), 3000);
        }
        else {
            this.titelText = 'Fout geantwoord';
            this.color = 'red';
            this.size = 30;
            setTimeout(this.answerWrong.bind(this), 3000);
        }
    }
    answerWrong() {
        this.room.miniGameFinished = true;
        this.room.answer = false;
    }
    answer() {
        this.room.miniGameFinished = true;
        this.room.answer = true;
        this.room.getHintsGame().foundHint('R');
    }
    writeTextToCanvas(text, fontSize = 40, xCoordinate, yCoordinate, alignment = 'center', color = 'white') {
        this.ctx.font = `700 ${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
        this.ctx.strokeText(text, xCoordinate, yCoordinate);
        this.ctx.strokeStyle = 'black';
    }
}
//# sourceMappingURL=MiniGame6.js.map