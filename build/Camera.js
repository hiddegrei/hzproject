export default class Camera {
    matrix = [];
    invMatrix = [];
    constructor() {
        this.matrix = [1, 0, 0, 1, 0, 0];
        this.invMatrix = [1, 0, 0, 1];
    }
    checkScaling(canvas, particle) {
        let ret = { x: 0, y: 0 };
        if (window.innerWidth >= canvas.width && window.innerHeight >= canvas.height) {
            return { x: 0, y: 0 };
        }
        else {
            let offsetX = canvas.width - window.innerWidth;
            let offsetY = canvas.height - window.innerHeight;
            if (particle.pos.x > window.innerWidth / 2 && particle.pos.x < window.innerWidth / 2 + offsetX) {
                ret.x = -(offsetX - (window.innerWidth / 2 + offsetX - particle.pos.x));
            }
            if (particle.pos.x > window.innerWidth / 2 + offsetX) {
                ret.x = -(offsetX);
            }
            if (particle.pos.y > window.innerHeight / 2 && particle.pos.y < window.innerHeight / 2 + offsetY) {
                ret.y = -(offsetY - (window.innerHeight / 2 + offsetY - particle.pos.y));
            }
            if (particle.pos.y > window.innerHeight / 2 + offsetY) {
                ret.y = -(offsetY);
            }
            return ret;
        }
    }
    createMatrix(x, y, scale, rotate) {
        this.matrix[3] = this.matrix[0] = Math.cos(rotate) * scale;
        this.matrix[2] = -(this.matrix[1] = Math.sin(rotate) * scale);
        this.matrix[4] = x;
        this.matrix[5] = y;
        let cross = this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2];
        if (cross != 0) {
            this.invMatrix[0] = this.matrix[3] / cross;
            this.invMatrix[1] = -this.matrix[1] / cross;
            this.invMatrix[2] = -this.matrix[2] / cross;
            this.invMatrix[3] = this.matrix[0] / cross;
        }
        else {
            this.invMatrix = [1, 0, 0, 1];
        }
    }
    toWorld(x, y) {
        var xx, yy, m, result;
        m = this.invMatrix;
        xx = x - this.matrix[4];
        yy = y - this.matrix[5];
        return {
            x: xx * this.invMatrix[0] + yy * this.invMatrix[2],
            y: xx * this.invMatrix[1] + yy * this.invMatrix[3]
        };
    }
}
//# sourceMappingURL=Camera.js.map