import Ray from "./Ray.js";
export default class Particle {
    ctx;
    pos = {};
    rays = [];
    radius;
    speed;
    dir = {};
    mouse = {};
    angleView;
    constructor(x, y, ctx) {
        this.ctx = ctx;
        this.pos = { x: x, y: y };
        this.rays = [];
        this.radius = 10;
        this.speed = 3;
        this.dir = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.angleView = 15;
    }
    getAngleDeg(ax, ay, bx, by) {
        var angleRad = Math.atan((ay - by) / (ax - bx));
        var angleDeg = angleRad * 180 / Math.PI;
        return (angleDeg);
    }
    move(mx, my, borders) {
        let walk = true;
        if (this.rays.length > 0) {
            for (let i = 0; i < borders.length; i++) {
                let pt = this.rays[15].cast(borders[i]);
                if (pt) {
                    let a = pt.x - this.pos.x;
                    let b = pt.y - this.pos.y;
                    let d = Math.sqrt(a * a + b * b);
                    if (d < 5) {
                        walk = false;
                    }
                }
            }
        }
        this.dir = { x: mx - this.pos.x, y: my - this.pos.y };
        const a = this.pos.x - this.pos.x + this.dir.x;
        const b = this.pos.y - this.pos.y + this.dir.y;
        const d = Math.sqrt((a * a) + (b * b));
        const radians = Math.atan2(a, b);
        let degrees = (radians * 180) / Math.PI - 90;
        while (degrees >= 360)
            degrees -= 360;
        while (degrees < 0)
            degrees += 360;
        this.angleView = degrees;
        this.rays = [];
        for (let i = degrees - 15; i < degrees; i++) {
            this.rays.push(new Ray(this.pos, i, this.ctx));
        }
        for (let i = degrees; i < degrees + 15; i++) {
            this.rays.push(new Ray(this.pos, i, this.ctx));
        }
        this.dir.x = (this.dir.x / d) * this.speed;
        this.dir.y = (this.dir.y / d) * this.speed;
        if (d > 20 && walk) {
            this.pos.x += this.dir.x;
            this.pos.y += this.dir.y;
        }
    }
    show() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    look(borders) {
        for (let ray of this.rays) {
            let closest = { x: -1, y: -1 };
            let record = Infinity;
            for (let border of borders) {
                const p = ray.cast(border);
                if (p) {
                    const a = p.x - this.pos.x;
                    const b = p.y - this.pos.y;
                    const d = Math.sqrt((a * a) + (b * b));
                    if (d <= record) {
                        record = d;
                        closest.x = p.x;
                        closest.y = p.y;
                    }
                }
            }
            if (closest.x != -1) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.pos.x, this.pos.y);
                this.ctx.lineTo(closest.x, closest.y);
                this.ctx.stroke();
            }
        }
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Particle.js.map