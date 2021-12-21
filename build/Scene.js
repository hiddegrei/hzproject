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
    widthHall;
    progression;
    count;
    constructor(canvas, game) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.game = game;
        this.ctx = this.canvas.getContext('2d');
        this.progression = new Progression(this.canvas);
        this.score = new Score(0, this.canvas);
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
        this.progression.writeTextToCanvas('progress: ', 850, 20);
        if (this.count >= 100) {
            this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, 1050 + this.progression.getProgression(), 20);
            this.progression.setXEnd();
        }
        else {
            this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, 1050, 20);
        }
        this.progression.pBar(this.ctx);
        this.score.writeTextToCanvas(`Score: ${this.score.getScore()}`, 500, 20);
        document.onmousemove = this.mouseDown.bind(this);
        this.particle.move(this.mouse.x, this.mouse.y, this.borders);
        this.count += 1;
    }
    render() {
        this.particle.show();
        for (let i = 0; i < this.borders.length; i++) {
            this.borders[i].show();
        }
        this.particle.look(this.borders);
        this.writeTextToCanvas("Central hub", 20, this.canvas.width / 2, 400);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Scene.js.map