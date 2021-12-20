export default class Border {
    a = {};
    b = {};
    ctx;
    constructor(x1, y1, x2, y2, ctx) {
        this.a = { x: x1, y: y1 };
        this.b = { x: x2, y: y2 };
        this.ctx = ctx;
    }
    show() {
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(this.a.x, this.a.y);
        this.ctx.lineTo(this.b.x, this.b.y);
        this.ctx.stroke();
    }
}
//# sourceMappingURL=Border.js.map