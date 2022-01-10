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
    checkAngle;
    checkRays = [];
    keyNum;
    status;
    hackRange;
    constructor(x, y, ctx, widthHall, mode, keyNum, status) {
        this.ctx = ctx;
        this.keyNum = keyNum;
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
        this.checkAngle = 6;
        this.status = status;
        if (status === "yellow") {
            this.hackRange = 100;
        }
        else if (status === "orange") {
            this.hackRange = 80;
        }
        else if (status === "red") {
            this.hackRange = 60;
        }
    }
    applyforce(force) {
        this.acc.add(force);
    }
    update(particle, borders) {
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
            for (let i = 0; i < options.length; i++) {
                let clear = this.check90(options[i].angle, borders);
                if (clear) {
                    open.push(i);
                    opt += 1;
                }
            }
        }
        if (opt > 0 && this.mode === "random") {
            let pick = Math.random() * (opt - 1);
            let picked = open[Math.round(pick)];
            let todo = options[picked];
            if (Vector.dist(this.pos, this.target) <= this.radius * 2) {
                this.target.x = this.pos.x + todo.x;
                this.target.y = this.pos.y + todo.y;
            }
        }
        else if (opt > 0 && this.mode === "search") {
            let record = Infinity;
            let nextTarget = new Vector(0, 0);
            for (let i = 0; i < open.length; i++) {
                let potential = new Vector(0, 0);
                potential.x = this.pos.x + options[open[i]].x;
                potential.y = this.pos.y + options[open[i]].y;
                let d = Vector.dist(potential, particle.pos);
                if (d < record) {
                    record = d;
                    nextTarget.x = this.pos.x + options[open[i]].x;
                    nextTarget.y = this.pos.y + options[open[i]].y;
                }
            }
            if (Vector.dist(this.pos, this.target) <= this.radius * 2) {
                this.target.x = nextTarget.x;
                this.target.y = nextTarget.y;
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
    check90(angle, borders) {
        let clear = true;
        this.checkRays = [];
        for (let i = angle - this.checkAngle; i < angle; i++) {
            this.checkRays.push(new Ray(this.pos, i, this.ctx));
        }
        for (let i = angle; i < angle + this.checkAngle; i++) {
            this.checkRays.push(new Ray(this.pos, i, this.ctx));
        }
        for (let j = 0; j < this.checkRays.length; j++) {
            let closest = { x: -1, y: -1 };
            let record = Infinity;
            let type = "";
            for (let i = 0; i < borders.length; i++) {
                let pt = this.checkRays[j].cast(borders[i]);
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
            if (record > this.widthHall - 5 && this.inv(angle) != this.lastAngle) {
            }
            else {
                return false;
            }
        }
        return true;
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
        this.writeTextToCanvas(`${this.keyNum}`, 20, this.pos.x, this.pos.y - 35);
        let color;
        if (this.status === "yellow") {
            color = "rgb(255,255,0)";
        }
        else if (this.status === "orange") {
            color = "rgb(255, 165, 0)";
        }
        else if (this.status === "red") {
            color = "rgb(255, 0, 0)";
        }
        if (this.mode === "random") {
            ctx.lineWidth = 1;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.fill();
        }
        else {
            ctx.lineWidth = 1;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.fill();
        }
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
                if (this.mode === "random") {
                    ctx.strokeStyle = "rgb(0,0,255)";
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
                else {
                    ctx.strokeStyle = "rgb(0,255,0)";
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