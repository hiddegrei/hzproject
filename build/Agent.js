import Border from "./Border.js";
import Ray from "./Ray.js";
import Vector from "./Vector.js";
export default class Agent {
    ctx;
    pos;
    rays = [];
    radius;
    speed;
    dir = {};
    mouse = {};
    angleView;
    vel;
    acc;
    maxspeed;
    widthHall;
    target;
    lastAngle;
    viewRays;
    sight;
    mode;
    constructor(x, y, ctx, widthHall, mode) {
        this.ctx = ctx;
        this.mode = mode;
        this.pos = new Vector(x, y);
        this.rays = [];
        this.radius = 10;
        this.speed = 1;
        this.dir = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.angleView = 18;
        this.maxspeed = 0.5;
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.widthHall = widthHall;
        this.lastAngle = 0;
        for (let i = 0; i < 360; i += 90) {
            this.rays.push(new Ray(this.pos, i, this.ctx));
        }
        this.target = new Vector(x, y);
        this.viewRays = [];
        this.sight = 80;
    }
    applyforce(force) {
        this.acc.add(force);
    }
    update(mx, my, borders) {
        this.dir = { x: this.target.x - this.pos.x, y: this.target.y - this.pos.y };
        const a = this.pos.x - this.pos.x + this.dir.x;
        const b = this.pos.y - this.pos.y + this.dir.y;
        const d = Math.sqrt((a * a) + (b * b));
        const radians = Math.atan2(a, b);
        let degrees = (radians * 180) / Math.PI - 90;
        while (degrees >= 360)
            degrees -= 360;
        while (degrees < 0)
            degrees += 360;
        this.lastAngle = degrees;
        let walk = true;
        let options = [
            { x: +this.widthHall, y: 0, angle: 0 },
            { x: 0, y: -this.widthHall, angle: 90 },
            { x: -this.widthHall, y: 0, angle: 180 },
            { x: 0, y: +this.widthHall, angle: 270 },
        ];
        let open = [];
        let opt = 0;
        if (this.rays.length > 0) {
            for (let j = 0; j < this.rays.length; j++) {
                let closest = { x: -1, y: -1 };
                let record = Infinity;
                let type = "";
                for (let i = 0; i < borders.length; i++) {
                    let pt = this.rays[j].cast(borders[i]);
                    if (pt) {
                        let a = pt.x - this.pos.x;
                        let b = pt.y - this.pos.y;
                        let d = Math.sqrt(a * a + b * b);
                        if (d < record) {
                            record = d;
                            closest = pt;
                            type = borders[i].type;
                        }
                    }
                }
                if (record > this.widthHall && this.inv(options[j].angle) != this.lastAngle) {
                    open.push(j);
                    opt += 1;
                }
            }
        }
        if (opt > 0) {
            let pick = Math.random() * (opt - 1);
            let picked = open[Math.round(pick)];
            let todo = options[picked];
            if (Vector.dist(this.pos, this.target) <= this.radius * 2) {
                this.target.x = this.pos.x + todo.x;
                this.target.y = this.pos.y + todo.y;
            }
        }
        this.viewRays = [];
        for (let i = degrees - this.angleView; i < degrees; i++) {
            this.viewRays.push(new Ray(this.pos, i, this.ctx));
        }
        for (let i = degrees; i < degrees + this.angleView; i++) {
            this.viewRays.push(new Ray(this.pos, i, this.ctx));
        }
        this.dir.x = (this.dir.x / d) * this.speed;
        this.dir.y = (this.dir.y / d) * this.speed;
        if (d > 20 && walk) {
            this.applyforce(this.dir);
        }
        else {
            this.vel.setMag(0);
            this.acc.setMag(0);
        }
    }
    inv(angle) {
        if (angle === 0) {
            return 180;
        }
        if (angle === 90) {
            return 270;
        }
        if (angle === 180) {
            return 0;
        }
        if (angle === 270) {
            return 90;
        }
        console.log("yo");
        return angle;
    }
    move() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.acc.setMag(0);
    }
    show(ctx) {
        ctx.lineWidth = 1;
        ctx.fillStyle = "rgb(0,0,255)";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    }
    look(borders, ctx) {
        for (let ray of this.viewRays) {
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
                ctx.fillStyle = "#FF0000";
                let rv = new Vector(closest.x, closest.y);
                rv.sub(this.pos);
                rv.limit(this.sight);
                ctx.beginPath();
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(this.pos.x + rv.x, this.pos.y + rv.y);
                ctx.stroke();
                ctx.closePath();
                ctx.fill();
            }
        }
    }
    inSight(particle, ctx) {
        let lines = [
            new Border(particle.pos.x, particle.pos.y - particle.radius, particle.pos.x, particle.pos.y + particle.radius, ctx, "particle"),
            new Border(particle.pos.x - particle.radius, particle.pos.y, particle.pos.x + particle.radius, particle.pos.y, ctx, "particle")
        ];
        let gotya = false;
        for (let ray of this.viewRays) {
            let closest = { x: -1, y: -1 };
            let record = this.sight;
            for (let border of lines) {
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
                gotya = true;
            }
        }
        if (gotya) {
            let rv = new Vector(this.target.x, this.target.y);
            rv.sub(this.pos);
            rv.setMag(this.sight + 20);
            this.writeTextToCanvas("!", 20, this.pos.x + rv.x, this.pos.y + rv.y, 'center', "red");
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'white') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Agent.js.map