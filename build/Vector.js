export default class Vector {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(a) {
        this.x += a.x;
        this.y += a.y;
    }
<<<<<<< HEAD
    sub(a) {
        this.x -= a.x;
        this.y -= a.y;
    }
=======
>>>>>>> 5e370bf32cae8830a0ebaf9516b247de1e757c20
    static add(a, b) {
        return { x: a.x + b.x, y: a.y + b.y };
    }
    limit(lim) {
        let lengthV = Math.sqrt(this.x * this.x + this.y * this.y);
        if (lengthV <= lim || lengthV === 0) {
        }
        else {
            let newx = this.x / lengthV;
            let newy = this.y / lengthV;
            this.x = newx * lim;
            this.y = newy * lim;
        }
    }
    static limit(a, lim) {
        let lengthV = Math.sqrt(a.x * a.x + a.y * a.y);
        if (lengthV <= lim) {
            return a;
        }
        else {
            let newx = a.x / lengthV;
            let newy = a.y / lengthV;
            return { x: newx * lim, y: newy * lim };
        }
    }
    setMag(mag) {
        let lengthV = Math.sqrt(this.x * this.x + this.y * this.y);
        if (lengthV != 0) {
            let newx = this.x / lengthV;
            let newy = this.y / lengthV;
            this.x = newx * mag;
            this.y = newy * mag;
        }
    }
    static setMag(a, mag) {
        let lengthV = Math.sqrt(a.x * a.x + a.y * a.y);
        let newx = a.x / lengthV;
        let newy = a.y / lengthV;
        return { x: newx * mag, y: newy * mag };
    }
    static sub(a, b) {
        return { x: a.x - b.x, y: a.y - b.y };
    }
    static dist(a, b) {
        const l1 = a.x - b.x;
        const l2 = a.y - b.y;
        return Math.sqrt(l1 * l1 + l2 * l2);
    }
}
//# sourceMappingURL=Vector.js.map