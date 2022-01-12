import MGMain from "./MGMain.js";
export default class MiniGame3 extends MGMain {
    ctx;
    constructor(ctx, room) {
        super(3, room);
        this.ctx = ctx;
    }
    update() {
    }
    render() {
        this.writeTextToCanvas(`Dit is kamer ` + this.roomId, 20, 200, 200);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=MiniGame3.js.map