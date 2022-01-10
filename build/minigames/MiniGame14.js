export default class MiniGame14 {
    ctx;
    roomId;
    constructor(ctx) {
        this.ctx = ctx;
        this.roomId = 14;
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
//# sourceMappingURL=MiniGame14.js.map