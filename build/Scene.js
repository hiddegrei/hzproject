import Border from "./Border.js";
import Particle from "./Particle.js";
export default class Scene {
    canvas;
    ctx;
    game;
    borders = [];
    particle = {};
    mouse = {};
    static SPACE = 300;
    score;
    constructor(canvas, game) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.game = game;
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.borders = [];
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const x2 = Math.random() * this.canvas.width;
            const y2 = Math.random() * this.canvas.height;
            this.borders.push(new Border(x, y, x2, y2, this.ctx));
        }
        this.particle = new Particle(100, 100, this.ctx);
        this.mouse = { x: 0, y: 0 };
    }
    processInput() {
    }
    mouseDown(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.onmousemove = this.mouseDown.bind(this);
        this.particle.move(this.mouse.x, this.mouse.y, this.borders);
    }
    render() {
        this.particle.show();
        for (let i = 0; i < this.borders.length; i++) {
            this.borders[i].show();
        }
        this.particle.look(this.borders);
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Scene.js.map