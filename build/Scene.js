import Border from './Border.js';
import Particle from './Particle.js';
import Level1map from './Level1map.js';
import Progression from './Progression.js';
import Score from './Score.js';
import Vector from './Vector.js';
import KeyboardListener from './KeyboardListener.js';
import Camera from './Camera.js';
import TimeLimit from './TimeLimit.js';
import Agent from './Agent.js';
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
    agent;
    username;
    password;
    timeLimit;
    time;
    timeLeft;
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
            this.borders.push(new Border(x, y, x2, y2, this.ctx, "normal"));
        }
        for (let i = 0; i < this.level.agentBorders.length; i++) {
            const x = this.level.agentBorders[i][0];
            const y = this.level.agentBorders[i][1];
            const x2 = this.level.agentBorders[i][2];
            const y2 = this.level.agentBorders[i][3];
            this.borders.push(new Border(x, y, x2, y2, this.ctx, "agent"));
        }
        this.particle = new Particle(100, 100 + 0.5 * this.level.widthHall, this.ctx);
        this.agent = new Agent(1.5 * this.level.widthHall, 100 + 0.5 * this.level.widthHall, this.ctx, this.level.widthHall, "random");
        this.mouse = { x: 0, y: 0 };
        this.count = 0;
        this.username = localStorage.getItem('username');
        this.password = localStorage.getItem('password');
        this.timeLimit = new TimeLimit(this.password);
        this.timeLeft = this.timeLimit.timeLimit;
        this.time = 0;
        console.log("username: ", this.username);
    }
    processInput() {
    }
    mouseDown(e) {
        this.mouse = this.camera.toWorld(e.clientX, e.clientY);
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        let trans = this.camera.checkScaling(this.canvas, this.particle);
        this.camera.createMatrix(trans.x, trans.y, 0, 0);
        this.ctx.translate(trans.x, trans.y);
        this.progression.writeTextToCanvas('progress: ', this.canvas.width / 10 * 6.5, 20);
        document.onmousemove = this.mouseDown.bind(this);
        this.count += 1;
        this.progression.writeTextToCanvas('progress: ', 850, 20);
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
        this.score[0].writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 20);
        if (this.keyboard.isKeyDown(82)) {
            this.game.isEnd = true;
        }
        document.onmousemove = this.mouseDown.bind(this);
        this.particle.move(this.mouse.x, this.mouse.y, this.borders);
        this.count += 1;
        if (this.time > 1000) {
            this.timeLeft -= 1;
            this.time = 0;
        }
        else {
            this.time += elapsed;
        }
        this.particle.move(this.mouse.x, this.mouse.y, this.borders);
        this.agent.update(this.mouse.x, this.mouse.y, this.borders);
        this.agent.move();
        this.agent.inSight(this.particle, this.ctx);
        this.agent.update(this.mouse.x, this.mouse.y, this.borders);
        this.agent.move();
    }
    render() {
        this.particle.show();
        for (let i = 0; i < this.borders.length; i++) {
            this.borders[i].show();
        }
        this.particle.look(this.borders);
        this.writeTextToCanvas('Central hub', 20, this.canvas.width / 2, 400);
        this.writeTextToCanvas("Timelimit: " + this.timeLeft, 20, this.canvas.width / 3, 20);
        this.agent.show(this.ctx);
        this.agent.look(this.borders, this.ctx);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Scene.js.map