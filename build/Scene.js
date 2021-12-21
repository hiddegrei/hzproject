import Border from './Border.js';
import Particle from './Particle.js';
import Level1map from './Level1map.js';
import Progression from './Progression.js';
import Score from './Score.js';
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
    constructor(canvas, game) {
        this.canvas = canvas;
        this.canvas.width = 1920;
        this.canvas.height = 969;
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
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        let trans = this.checkScaling();
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
        if (window.innerWidth <= this.canvas.width && window.innerHeight <= this.canvas.height) {
            return { x: 0, y: 0 };
        }
        else {
            let offsetX = this.canvas.width - window.innerWidth;
            let offsetY = this.canvas.height - window.innerHeight;
            if (this.particle.pos.x > window.innerWidth / 2 && this.particle.pos.x < window.innerWidth / 2 + offsetX) {
                ret.x = -(window.innerWidth / 2 + offsetX - this.particle.pos.x);
            }
            if (this.particle.pos.y > window.innerHeight / 2 && this.particle.pos.y < window.innerHeight / 2 + offsetY) {
                ret.y = -(window.innerHeight / 2 + offsetY - this.particle.pos.y);
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