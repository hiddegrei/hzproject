export default class Keys {
    keys = [];
    ctx;
    inPossesion = [];
    constructor(ctx) {
        this.ctx = ctx;
        for (let i = 0; i < 15; i++) {
            this.keys[i] = false;
            this.inPossesion[i] = false;
        }
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
        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i]) {
                this.writeTextToCanvas(`key: ${i}`, 15, window.innerWidth / 2, index2 * 30);
                index2++;
            }
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Keys.js.map