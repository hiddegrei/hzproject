import Vector from "./Vector.js";
export default class Border {
    a;
    b;
    ctx;
    type;
    constructor(x1, y1, x2, y2, ctx, type) {
<<<<<<< HEAD
        this.a = new Vector(x1, y1);
        this.b = new Vector(x2, y2);
        this.type = type;
=======
        this.a = { x: x1, y: y1 };
        this.b = { x: x2, y: y2 };
>>>>>>> 5e370bf32cae8830a0ebaf9516b247de1e757c20
        this.ctx = ctx;
        this.type = type;
    }
    show() {
        if (this.type === "normal") {
            this.ctx.strokeStyle = "rgb(255,255,255)";
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.a.x, this.a.y);
            this.ctx.lineTo(this.b.x, this.b.y);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.fill();
        }
        else {
            this.ctx.strokeStyle = "rgb(0,0,255)";
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.a.x, this.a.y);
            this.ctx.lineTo(this.b.x, this.b.y);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.fill();
        }
    }
}
//# sourceMappingURL=Border.js.map