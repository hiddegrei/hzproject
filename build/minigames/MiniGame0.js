import MGMain from "./MGMain.js";
import Game from "../Game.js";
export default class MiniGame0 extends MGMain {
    ctx;
    imageBob;
    image;
    constructor(ctx, room) {
        super(0, room);
        this.ctx = ctx;
        this.imageBob = Game.loadNewImage("./assets/img/players/bob.png");
        this.image = Game.loadNewImage("./assets/img/background/password2.jpg");
    }
    update() {
        this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
        if (this.keyboard.isKeyDown(67)) {
            this.room.miniGameFinished = true;
            this.room.answer = true;
            this.room.getHintsGame().foundHint('b');
            this.room.getHintsGame().foundHint('!');
        }
        else if (this.keyboard.isKeyDown(66) || this.keyboard.isKeyDown(65)) {
            this.room.miniGameFinished = true;
            this.room.answer = false;
        }
    }
    render() {
        this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight);
        this.writeTextToCanvas("Dit is Bob, Bob heeft een account op twitter.com. De profielnaam van Bob op Twitter is Bob12 en zijn wachtwoord is 'ABC54@#2as'. ", 20, 100, 100);
        this.writeTextToCanvas("Bob maakt een account aan op Instagram, wat is het beste wachtwoord dat hij kan kiezen? Hieronder staan de verdere gegevens van Bob", 20, 100, 120);
        this.ctx.strokeStyle = "rgb(0,0,0)";
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.beginPath();
        this.ctx.rect(100, 200, 400, 400);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.rect(590, 200, 750, 150);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.drawImage(this.imageBob, 100, 200);
        this.writeTextToCanvas("naam: Bob", 20, 110, 355);
        this.writeTextToCanvas("leeftijd: 17", 20, 110, 400);
        this.writeTextToCanvas("geboorte datum: 01/10/2001", 20, 110, 450);
        this.writeTextToCanvas("woonplaats: Utrecht", 20, 110, 500);
        this.writeTextToCanvas("Bob17Utrecht01", 20, 600, 230);
        this.writeTextToCanvas("press a", 20, 1250, 230);
        this.writeTextToCanvas("ABC54@#2as", 20, 600, 280);
        this.writeTextToCanvas("press b", 20, 1250, 280);
        this.writeTextToCanvas("Laat je wachtwoord-manager een wachtwoord genereren", 20, 600, 330);
        this.writeTextToCanvas("press c", 20, 1250, 330);
    }
    writeTextToCanvas(text, fontSize = 40, xCoordinate, yCoordinate, alignment = 'start', color = 'black') {
        this.ctx.font = `400 ${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
        this.ctx.strokeText(text, xCoordinate, yCoordinate);
        this.ctx.strokeStyle = 'black';
    }
}
//# sourceMappingURL=MiniGame0.js.map