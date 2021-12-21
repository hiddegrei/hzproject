export default class Vector {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static add(a, b) {
        return { x: a.x + b.x, y: a.y + b.y };
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