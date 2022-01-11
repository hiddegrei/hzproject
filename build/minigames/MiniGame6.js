import Room from "../Room.js";
import MGMain from "./MGMain.js";
export default class MiniGame6 extends MGMain {
    ctx;
    fullFingerprint;
    partFingerprint;
    randomNumber;
    constructor(ctx, room) {
        super(6, room);
        this.ctx = ctx;
        this.fullFingerprint = [Room.loadNewImage('assets/img/fingerPrints/resized-fingerprint-1382652_1920.jpg'), Room.loadNewImage('assets/img/fingerPrints/resized-detective-fingerprints-print.png'), Room.loadNewImage('assets/img/fingerPrints/resized-istockphoto-534450004-612x612.jpg')];
        this.partFingerprint = [Room.loadNewImage('assets/img/fingerPrints/detective-fingerprints-arch.png'), Room.loadNewImage('assets/img/fingerPrints/detective-fingerprints-loop.png'), Room.loadNewImage('assets/img/fingerPrints/detective-fingerprints-whorl.png')];
        this.randomNumber = Room.randomNumber(0, 2);
    }
    update() {
    }
    render() {
        this.writeTextToCanvas(`this is room` + this.roomId, 20, 200, 200);
        this.writeTextToCanvas(`match the fingerprint with the smaller ones`, 20, window.innerWidth / 2, window.innerHeight / 8);
        this.loadFingerPrints();
    }
    loadFingerPrints() {
        this.ctx.drawImage(this.fullFingerprint[this.randomNumber], window.innerWidth / 3, window.innerHeight / 3);
        this.partFingerprint.forEach((value, index) => this.ctx.drawImage(value, window.innerWidth / 1.5, window.innerHeight / 4 * (index + 1)));
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=MiniGame6.js.map