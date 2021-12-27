import Border from './Border.js';
import Particle from './Particle.js';
import Level1map from './Level1map.js';
import Score from './Score.js';
import Vector from './Vector.js';
import KeyboardListener from './KeyboardListener.js';
import Camera from './Camera.js';
import TimeLimit from './TimeLimit.js';
import Agent from './Agent.js';
import Progress from './Progress.js';
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
    count;
    endGame;
    condition;
    currentTrans;
    timeArray;
    keyboard;
    camera;
    agents = [];
    timeLimit;
    time;
    timeLeft;
    progress;
    roomsIds = [];
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
        this.progress = new Progress();
        console.log("window widht:", window.innerWidth);
        console.log("window height:", window.innerHeight);
        this.score = [];
        this.score.push(new Score(0));
        this.totalScore = 0;
        this.borders = [];
        this.level = new Level1map(this.canvas, this.ctx);
        this.roomsIds = this.level.rooms;
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
        this.agents.push(new Agent(1.5 * this.level.widthHall, 100 + 0.5 * this.level.widthHall, this.ctx, this.level.widthHall, "random"));
        this.agents.push(new Agent((this.canvas.width / 2) + 3.5 * this.level.widthHall, 300 + 2 * this.level.widthHall, this.ctx, this.level.widthHall, "random"));
        this.agents.push(new Agent((this.canvas.width / 2) - (0.5 * this.level.widthHall), 100 + 3 * this.level.widthHall, this.ctx, this.level.widthHall, "search"));
        this.mouse = { x: 0, y: 0 };
        this.count = 0;
        this.timeLimit = new TimeLimit(this.game.password);
        this.timeLeft = this.timeLimit.timeLimit;
        this.time = 0;
    }
    processInput() {
    }
    mouseDown(e) {
        this.mouse = this.camera.toWorld(e.clientX, e.clientY);
    }
    update(elapsed) {
        if (false) {
            this.game.isEnd = true;
        }
        else {
            this.timeLeft -= elapsed;
            document.querySelector('div#timeLimit.hud span').innerHTML = (JSON.stringify(Math.floor(this.timeLeft / 1000)));
            document.querySelector('div#score.hud span').innerHTML = JSON.stringify(this.totalScore);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            let trans = this.camera.checkScaling(this.canvas, this.particle);
            this.camera.createMatrix(trans.x, trans.y, 0, 0);
            this.ctx.translate(trans.x, trans.y);
            document.onmousemove = this.mouseDown.bind(this);
            this.count += 1;
            if (this.count >= 100) {
                if (this.count === 100) {
                    this.score.forEach((element) => { this.totalScore += element.score; });
                }
            }
            if (this.keyboard.isKeyDown(82)) {
                this.game.isEnd = true;
            }
            document.onmousemove = this.mouseDown.bind(this);
            this.particle.move(this.mouse.x, this.mouse.y, this.borders);
            if (this.particle.isInRoom(this.roomsIds)) {
            }
            ;
            this.count += 1;
            for (let i = 0; i < this.agents.length; i++) {
                this.agents[i].inSight(this.particle, this.ctx);
                this.agents[i].update(this.particle, this.borders);
                this.agents[i].move();
            }
        }
    }
    render() {
        this.particle.show();
        for (let i = 0; i < this.borders.length; i++) {
            this.borders[i].show();
        }
        this.particle.look(this.borders);
        this.writeTextToCanvas('Central hub', 20, this.canvas.width / 2, 400);
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].show(this.ctx);
            this.agents[i].look(this.borders, this.ctx);
        }
        for (let i = 0; i < this.roomsIds.length; i++) {
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = "rgb(255,0,0)";
            this.ctx.beginPath();
            this.ctx.arc(this.roomsIds[i][0], this.roomsIds[i][1], 10, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.fill();
            this.writeTextToCanvas(this.roomsIds[i][2], 20, this.roomsIds[i][0], this.roomsIds[i][1] - 20);
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Scene.js.map