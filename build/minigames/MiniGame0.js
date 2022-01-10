import MGMain from "./MGMain.js";
import Game from "../Game.js";
export default class MiniGame0 extends MGMain {
    ctx;
    imageBob;
    constructor(ctx, room) {
        super(0, room);
        this.ctx = ctx;
        this.imageBob = Game.loadNewImage("./assets/img/players/bob.png");
    }
    update() {
        this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
        if (this.keyboard.isKeyDown(67)) {
            this.room.miniGameFinished = true;
            this.room.answer = true;
        }
        else if (this.keyboard.isKeyDown(66) || this.keyboard.isKeyDown(65)) {
            this.room.miniGameFinished = true;
            this.room.answer = false;
        }
    }
    render() {
        this.writeTextToCanvas("Dit is Bob, Bob heeft een account op twitter.com. De profielnaam van Bob op Twitter is Bob12 en zijn wachtwoord is 'ABC54@#2as'. ", 20, 100, 100);
        this.writeTextToCanvas("Bob maakt een account aan op Instagram, wat is het beste wachtwoord dat hij kan kiezen? Hieronder staan de verdere gegevens van Bob", 20, 100, 120);
        this.ctx.strokeStyle = "rgb(255,255,255)";
        this.ctx.beginPath();
        this.ctx.rect(100, 200, 400, 400);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.drawImage(this.imageBob, 100, 200);
        this.writeTextToCanvas("naam: Bob", 20, 110, 350);
        this.writeTextToCanvas("leeftijd: 17", 20, 110, 400);
        this.writeTextToCanvas("woonplaats: Utrecht", 20, 110, 450);
        this.writeTextToCanvas("Bob17Utrecht17", 20, 600, 210);
        this.writeTextToCanvas("press a", 20, 1200, 210);
        this.writeTextToCanvas("ABC54@#2as", 20, 600, 260);
        this.writeTextToCanvas("press b", 20, 1200, 260);
        this.writeTextToCanvas("Laat je wachtwoord-manager een wachtwoord genereren", 20, 600, 310);
        this.writeTextToCanvas("press c", 20, 1200, 310);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'start', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=MiniGame0.js.map