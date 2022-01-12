import Game from "../Game.js";
import MGMain from "./MGMain.js";
export default class MiniGame1 extends MGMain {
    ctx;
    image;
    constructor(ctx, room) {
        super(1, room);
        this.ctx = ctx;
        this.image = Game.loadNewImage("./assets/img/background/password2.jpg");
    }
    update() {
        this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
        if (this.keyboard.isKeyDown(65)) {
            this.room.miniGameFinished = true;
            this.room.answer = true;
            this.room.getHintsGame().foundHint('g');
        }
        else if (this.keyboard.isKeyDown(66) || this.keyboard.isKeyDown(67)) {
            this.room.miniGameFinished = true;
            this.room.answer = false;
        }
    }
    render() {
        this.writeTextToCanvas(`Dit is kamer ` + this.roomId, 20, 100, 50);
        this.writeTextToCanvas("Wat is juist?", 20, 100, 200);
        this.writeTextToCanvas("Gebruik een wachtwoord-manager en 2-staps verificatie", 20, 100, 300);
        this.writeTextToCanvas("press a", 20, (window.innerWidth / 2) + 400, 300);
        this.writeTextToCanvas("Gebruik het zelfde wachtwoord voor elke website", 20, 100, 400);
        this.writeTextToCanvas("press b", 20, (window.innerWidth / 2) + 400, 400);
        this.writeTextToCanvas("Gebruik een ander wachtwoord voor elke website en sla je wachtwoorden op in kladblok op je telefoon", 20, 100, 500);
        this.writeTextToCanvas("press c", 20, (window.innerWidth / 2) + 400, 500);
    }
    writeTextToCanvas(text, fontSize = 40, xCoordinate, yCoordinate, color = 'black', alignment = 'center') {
        this.ctx.font = `400 ${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.textAlign = "start";
        this.ctx.fillText(text, xCoordinate, yCoordinate);
        this.ctx.strokeText(text, xCoordinate, yCoordinate);
        this.ctx.strokeStyle = 'black';
    }
}
//# sourceMappingURL=MiniGame1.js.map