export default class MiniGame6 {
    ctx;
    roomId;
    constructor(ctx) {
        this.ctx = ctx;
        this.roomId = 6;
    }
    update() {
    }
    render() {
        this.writeTextToCanvas(`this is room` + this.roomId, 20, 200, 200);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=MiniGame6.js.map