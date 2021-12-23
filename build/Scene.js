import Border from './Border.js';
import Particle from './Particle.js';
import Level1map from './Level1map.js';
import Progression from './Progression.js';
import Score from './Score.js';
import Vector from './Vector.js';
import KeyboardListener from './KeyboardListener.js';
import Camera from './Camera.js';
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
    endGame;
    condition;
    currentTrans;
    timeArray;
    keyboard;
    camera;
    constructor(canvas, game) {
        this.timeArray = [Date.now()];
        this.canvas = canvas;
        this.canvas.width = 1920;
        this.canvas.height = 969;
        this.camera = new Camera();
        this.currentTrans = new Vector(0, 0);
        this.keyboard = new KeyboardListener();
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
        this.particle = new Particle(100, 100 + 0.5 * this.level.widthHall, this.ctx);
        this.mouse = { x: 0, y: 0 };
        this.count = 0;
    }
    processInput() {
    }
    mouseDown(e) {
        this.mouse = this.camera.toWorld(e.clientX, e.clientY);
    }
    update() {
        this.timeArray.push(Date.now());
        if (this.game.timeLimit - (Date.now() - this.timeArray[0]) < 0) {
            this.game.isEnd = true;
        }
        else {
            this.game.timeLimit -= (Date.now() - this.timeArray[0]);
            this.timeArray.shift();
            document.querySelector('div#timeLimit.hud span').innerHTML = (JSON.stringify(Math.floor(this.game.timeLimit / 1000)));
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            let trans = this.camera.checkScaling(this.canvas, this.particle);
            this.camera.createMatrix(trans.x, trans.y, 0, 0);
            this.ctx.translate(trans.x, trans.y);
            document.onmousemove = this.mouseDown.bind(this);
            this.particle.move(this.mouse.x, this.mouse.y, this.borders);
            this.count += 1;
            if (this.count >= 100) {
                this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, this.canvas.width / 10 * 9, 20);
                this.progression.setXEnd();
                if (this.count === 100) {
                    this.score.forEach((element) => { this.totalScore += element.getScore(); });
                }
            }
            else {
                this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, this.canvas.width / 10 * 9, 20);
            }
            this.progression.pBar(this.ctx);
            if (this.keyboard.isKeyDown(82)) {
                this.game.isEnd = true;
            }
            document.onmousemove = this.mouseDown.bind(this);
            this.particle.move(this.mouse.x, this.mouse.y, this.borders);
            this.count += 1;
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