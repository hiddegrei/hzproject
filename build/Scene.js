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
import Room from './Room.js';
import Keys from './Keys.js';
import ScoreToDatabase from './ScoreToDatabase.js';
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
    room;
    scoreToDatabase;
    timeArray;
    keyboard;
    camera;
    agents = [];
    timeLimit;
    time;
    timeLeft;
    progress;
    roomsIds = [];
    insideRoom;
    inRoomNum;
    keys;
    timeHacking;
    showKeys;
    lockedUp;
    hints;
    constructor(canvas, game) {
        this.timeArray = [Date.now()];
        this.canvas = canvas;
        this.canvas.width = 1920;
        this.canvas.height = 969;
        this.ctx = this.canvas.getContext('2d');
        this.camera = new Camera();
        this.lockedUp = 0;
        this.currentTrans = new Vector(0, 0);
        this.keyboard = new KeyboardListener();
        this.insideRoom = false;
        this.inRoomNum = -1;
        this.keys = new Keys(this.ctx);
        this.timeHacking = 0;
        this.showKeys = false;
        this.scoreToDatabase = new ScoreToDatabase();
        this.game = game;
        this.progress = new Progress();
        this.room = new Room(0, this.ctx, this, this.canvas);
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
        this.particle = new Particle(100 + this.level.widthHall, 100 + 0.5 * this.level.widthHall, this.ctx);
        this.agents.push(new Agent(1.5 * this.level.widthHall, 100 + 1.5 * this.level.widthHall, this.ctx, this.level.widthHall, "random", 0, "yellow"));
        this.agents.push(new Agent((this.canvas.width / 2) + 3.5 * this.level.widthHall, 300 + 2 * this.level.widthHall, this.ctx, this.level.widthHall, "random", 1, "orange"));
        this.agents.push(new Agent((this.canvas.width / 2) + 12.5 * this.level.widthHall, 300 + 8 * this.level.widthHall, this.ctx, this.level.widthHall, "random", 2, "yellow"));
        this.agents.push(new Agent((this.canvas.width / 2) - (0.5 * this.level.widthHall), 100 + 3 * this.level.widthHall, this.ctx, this.level.widthHall, "random", 3, "red"));
        this.keys.inPossesion[0] = true;
        this.keys.inPossesion[1] = true;
        this.keys.inPossesion[2] = true;
        this.keys.inPossesion[3] = true;
        this.mouse = { x: 0, y: 0 };
        this.count = 0;
        this.timeLimit = new TimeLimit(this.game.password);
        this.timeLeft = this.timeLimit.timeLimit;
        this.time = 0;
        this.hints = this.room.getHintsGame();
    }
    processInput() {
    }
    mouseDown(e) {
        this.mouse = this.camera.toWorld(e.clientX, e.clientY);
    }
    update(elapsed) {
        if (false) {
            this.game.isEnd = true;
            this.scoreToDatabase.update();
        }
        else if (this.insideRoom && (this.room.visitedRooms[this.inRoomNum] != true || this.inRoomNum === 80)) {
            this.room.update();
            let isMiniGameComplete = this.room.checkDone();
            if (isMiniGameComplete === true) {
                this.totalScore++;
            }
            if (isMiniGameComplete != 80 && isMiniGameComplete != false) {
                this.keys.total--;
            }
            if (isMiniGameComplete === 80) {
                this.particle.pos.x = (this.canvas.width / 2) + 18.5 * this.level.widthHall;
                this.particle.pos.y = 100 + 2 * this.level.widthHall;
            }
        }
        else {
            this.timeLeft -= elapsed;
            document.querySelector('div#timeLimit.hud span').innerHTML = (JSON.stringify(Math.floor(this.timeLeft / 1000)));
            document.querySelector('div#score.hud span').innerHTML = JSON.stringify(this.totalScore);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.keyboard.kPressed(84)) {
                this.showKeys = true;
            }
            if (this.keyboard.kPressed(89)) {
                this.showKeys = false;
            }
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
            let roomNum = this.particle.isInRoom(this.roomsIds);
            if (roomNum != -1
                && (this.keys.total > 0 || roomNum === 80)) {
                this.insideRoom = true;
                this.inRoomNum = roomNum;
                this.room.setRoomId(this.inRoomNum);
            }
            ;
            this.count += 1;
            this.writeTextToCanvas(`Verzamelde hints: `, 30, window.innerWidth / 6, window.innerHeight / 15);
            this.hints.getHint().forEach((value, index) => {
                this.writeTextToCanvas(`${value}`, 25, window.innerWidth / 4 + (index * 40), window.innerHeight / 15);
            });
            for (let i = 0; i < this.agents.length; i++) {
                if (Vector.dist(this.particle.pos, this.agents[i].pos) < 80) {
                    let inSight = this.agents[i].inSight(this.particle, this.ctx, this.borders);
                    if (inSight) {
                        if (this.lockedUp === 2) {
                            this.game.isEnd = true;
                        }
                        if (this.agents.length <= 5) {
                            this.agents.push(new Agent(100 + 5 * this.level.widthHall, 100 + 0.5 * this.level.widthHall, this.ctx, this.level.widthHall, "random", this.agents.length, "yellow"));
                        }
                        this.lockedUp++;
                        this.particle.pos.x = (this.canvas.width / 2) + 18 * this.level.widthHall;
                        this.particle.pos.y = 100 + 5 * this.level.widthHall;
                    }
                }
                this.agents[i].update(this.particle, this.borders);
                this.agents[i].move();
                if (this.agents[i].sleepingTime >= 20000) {
                    this.agents[i].sleepingTime = 0;
                    this.agents[i].sleeping = false;
                }
                else {
                    this.agents[i].sleepingTime += elapsed;
                }
            }
            this.particle.update(this.mouse.x, this.mouse.y, this.borders);
            this.particle.hack(this.agents);
            this.particle.move();
            let timeHack;
            if (this.agents[this.particle.hackAgent].status === "yellow") {
                timeHack = 5000;
            }
            else if (this.agents[this.particle.hackAgent].status === "orange") {
                timeHack = 7000;
            }
            else if (this.agents[this.particle.hackAgent].status === "red") {
                timeHack = 9000;
            }
            if (this.timeHacking < timeHack && this.particle.hacking) {
                this.timeHacking += elapsed;
            }
            else if (!this.particle.hacking) {
                this.timeHacking = 0;
            }
            else if (this.timeHacking >= timeHack && this.agents[this.particle.hackAgent].sleeping === false) {
                let key = this.agents[this.particle.hackAgent].keyNum;
                this.agents[this.particle.hackAgent].sleeping = true;
                this.keys.keys[key] = true;
                this.keys.total++;
                this.timeHacking = 0;
                if (this.agents[this.particle.hackAgent].status === "yellow") {
                    this.agents[this.particle.hackAgent].status = "orange";
                }
                else if (this.agents[this.particle.hackAgent].status === "orange") {
                    this.agents[this.particle.hackAgent].status = "red";
                }
                else if (this.agents[this.particle.hackAgent].status === "red") {
                    this.agents[this.particle.hackAgent].mode = "search";
                }
                else if (this.agents[this.particle.hackAgent].mode = "search") {
                    this.agents[this.particle.hackAgent].maxspeed += 0.2;
                }
                for (let i = 0; i < this.keys.keys.length; i++) {
                    if (!this.keys.inPossesion[i]) {
                        this.agents[this.particle.hackAgent].keyNum = i;
                        this.keys.inPossesion[i] = true;
                        break;
                    }
                }
            }
        }
    }
    gethintGame() {
        return this.hints;
    }
    render() {
        if (false) {
            this.game.isEnd = true;
        }
        else if (this.insideRoom && (this.room.visitedRooms[this.inRoomNum] != true || this.inRoomNum === 80)) {
            this.room.render();
        }
        else {
            this.particle.show();
            this.particle.animate();
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
        this.keys.show(this.ctx);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Scene.js.map