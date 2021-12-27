import Ray from "./Ray.js";
import Vector from "./Vector.js";
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
        this.speed = 1;
        this.dir = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.angleView = 18;
    }
    getAngleDeg(ax, ay, bx, by) {
        var angleRad = Math.atan((ay - by) / (ax - bx));
        var angleDeg = angleRad * 180 / Math.PI;
        return (angleDeg);
    }
    isInRoom(rooms) {
        for (let i = 0; i < rooms.length; i++) {
            let roomV = { x: rooms[i][0], y: rooms[i][1] };
            if (Vector.dist(this.pos, roomV) < this.radius * 2) {
                console.log("im inside room: ", rooms[i][2]);
            }
        }
    }
    move(mx, my, borders) {
        let walk = true;
        if (this.rays.length > 0) {
            for (let j = 0; j < this.rays.length; j++) {
                for (let i = 0; i < borders.length; i++) {
                    if (borders[i].type === "normal") {
                        let pt = this.rays[j].cast(borders[i]);
                        if (pt) {
                            let a = pt.x - this.pos.x;
                            let b = pt.y - this.pos.y;
                            let d = Math.sqrt(a * a + b * b);
                            if (d < this.radius + 5) {
                                walk = false;
                            }
                        }
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
        this.rays = [];
        for (let i = degrees - this.angleView; i < degrees; i++) {
            this.rays.push(new Ray(this.pos, i, this.ctx));
        }
        for (let i = degrees; i < degrees + this.angleView; i++) {
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
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fill();
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
                this.ctx.fillStyle = "#FF0000";
                this.ctx.beginPath();
                this.ctx.moveTo(this.pos.x, this.pos.y);
                this.ctx.lineTo(closest.x, closest.y);
                this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'white') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Particle.js.map