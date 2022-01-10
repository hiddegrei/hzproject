import MGMain from "./MGMain.js";
export default class MiniGame1 extends MGMain {
    ctx;
    constructor(ctx, room) {
        super(1, room);
        this.ctx = ctx;
    }
    update() {
        if (this.keyboard.isKeyDown(65)) {
            this.room.miniGameFinished = true;
            this.room.answer = true;
        }
        else {
            this.room.miniGameFinished = true;
            this.room.answer = false;
        }
    }
    render() {
        this.writeTextToCanvas(`this is room` + this.roomId, 20, 200, 50);
        this.writeTextToCanvas("Wat is juist?", 20, 200, 200);
        this.writeTextToCanvas("Gebruik een wachtwoord manager en 2-staps verificatie", 20, 200, 250);
        this.writeTextToCanvas("press a", 20, 500, 250);
        this.writeTextToCanvas("Gebruik het zelfde wachtwoord voor elke website ", 20, 200, 300);
        this.writeTextToCanvas("press b", 20, 500, 300);
        this.writeTextToCanvas("Gebruik een ander wachtwoord voor elke website en sla je wachtwoorden op in kladblok op je telefoon", 20, 200, 350);
        this.writeTextToCanvas("press c", 20, 500, 350);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=MiniGame1.js.map