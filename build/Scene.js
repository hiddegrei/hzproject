import Border from './Border.js';
import Particle from './Particle.js';
import Level1map from './Level1map.js';
import Progression from './Progression.js';
import Score from './Score.js';
import Vector from './Vector.js';
export default class Scene {
    canvas;
    ctx;
    game;
    borders = [];
    particle = {};
    mouse = {};
    level;
    static SPACE = 300;
    score;
    totalScore;
    widthHall;
    progression;
    count;
    currentTrans;
    matrix = [];
    invMatrix = [];
    constructor(canvas, game) {
        this.canvas = canvas;
        this.canvas.width = 1920;
        this.canvas.height = 969;
        this.currentTrans = new Vector(0, 0);
        this.matrix = [1, 0, 0, 1, 0, 0];
        this.invMatrix = [1, 0, 0, 1];
        this.game = game;
        this.ctx = this.canvas.getContext('2d');
        this.progression = new Progression(this.canvas);
        console.log("window widht:", window.innerWidth);
        console.log("window height:", window.innerHeight);
        this.score = [];
        this.score.push(new Score(0, this.canvas));
        this.totalScore = 0;
        this.borders = [];
        this.level = new Level1map(this.canvas, this.ctx);
        for (let i = 0; i < this.level.level1.length; i++) {
            const x = this.level.level1[i][0];
            const y = this.level.level1[i][1];
            const x2 = this.level.level1[i][2];
            const y2 = this.level.level1[i][3];
            this.borders.push(new Border(x, y, x2, y2, this.ctx));
        }
        this.particle = new Particle(100, 100, this.ctx);
        this.mouse = { x: 0, y: 0 };
        this.count = 0;
    }
    processInput() {
    }
    mouseDown(e) {
        this.mouse = this.toWorld(e.clientX, e.clientY);
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
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        let trans = this.checkScaling();
        this.createMatrix(trans.x, trans.y, 0, 0);
        this.currentTrans = { x: trans.x, y: trans.y };
        this.ctx.translate(trans.x, trans.y);
        document.onmousemove = this.mouseDown.bind(this);
        this.particle.move(this.mouse.x, this.mouse.y, this.borders);
        this.count += 1;
        this.progression.writeTextToCanvas('progress: ', 850, 20);
        if (this.count >= 100) {
            this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, 1050 + this.progression.getProgression(), 20);
            this.progression.setXEnd();
            if (this.count === 100) {
                this.score.forEach((element) => { this.totalScore += element.getScore(); });
            }
        }
        else {
            this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, 1050, 20);
        }
        this.progression.pBar(this.ctx);
        this.score[0].writeTextToCanvas(`Score: ${this.totalScore}`, 500, 20);
    }
    checkScaling() {
        let ret = { x: 0, y: 0 };
        if (window.innerWidth >= this.canvas.width && window.innerHeight >= this.canvas.height) {
            return { x: 0, y: 0 };
        }
        else {
            let offsetX = this.canvas.width - window.innerWidth;
            let offsetY = this.canvas.height - window.innerHeight;
            if (this.particle.pos.x > window.innerWidth / 2 && this.particle.pos.x < window.innerWidth / 2 + offsetX) {
                ret.x = -(offsetX - (window.innerWidth / 2 + offsetX - this.particle.pos.x));
            }
            if (this.particle.pos.x > window.innerWidth / 2 + offsetX) {
                ret.x = -(offsetX);
            }
            if (this.particle.pos.y > window.innerHeight / 2 && this.particle.pos.y < window.innerHeight / 2 + offsetY) {
                ret.y = -(offsetY - (window.innerHeight / 2 + offsetY - this.particle.pos.y));
            }
            if (this.particle.pos.y > window.innerHeight / 2 + offsetY) {
                ret.y = -(offsetY);
            }
            return ret;
        }
    }
    render() {
        this.particle.show();
        for (let i = 0; i < this.borders.length; i++) {
            this.borders[i].show();
        }
        this.particle.look(this.borders);
        this.writeTextToCanvas('Central hub', 20, this.canvas.width / 2, 400);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Scene.js.map