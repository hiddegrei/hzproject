import Game from "./Game.js";
export default class Keys {
    keys = [];
    ctx;
    inPossesion = [];
    total;
    goldkeyImg;
    constructor(ctx) {
        this.ctx = ctx;
        for (let i = 0; i < 15; i++) {
            this.keys[i] = false;
            this.inPossesion[i] = false;
        }
        this.total = 0;
        this.goldkeyImg = Game.loadNewImage("./assets/img/objects/goldkey.png");
    }
    show(ctx) {
        let index = 2;
        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i]) {
                index++;
            }
        }
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.beginPath();
        ctx.rect(window.innerWidth / 2 - 20, 40, 100, index * 30);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
        let index2 = 2;
        this.ctx.drawImage(this.goldkeyImg, 0, 0, this.goldkeyImg.width, this.goldkeyImg.height, window.innerWidth / 2 - 15, 40, 40, 40);
        this.writeTextToCanvas(` ${this.total}`, 15, window.innerWidth / 2 + 40, 65);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Keys.js.map