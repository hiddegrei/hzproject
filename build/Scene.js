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
    widthHall;
    constructor(canvas, game) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.game = game;
        this.ctx = this.canvas.getContext('2d');
        this.widthHall = 40;
        this.score = 0;
        this.borders = [];
        const level1 = [[0, 0, this.canvas.width, 0],
            [0, 0, 0, this.canvas.height],
            [this.canvas.width, 0, this.canvas.width, this.canvas.height],
            [0, this.canvas.height, this.canvas.width, this.canvas.height],
            [100, 100, this.canvas.width / 2, 100],
            [this.canvas.width / 2, 100, this.canvas.width / 2, 300],
            [100, 100 + this.widthHall, (this.canvas.width / 2) - this.widthHall, 100 + this.widthHall],
            [(this.canvas.width / 2) - this.widthHall, 100 + this.widthHall, (this.canvas.width / 2) - this.widthHall, 300],
            [(this.canvas.width / 2) - 2 * this.widthHall, 300, (this.canvas.width / 2) - this.widthHall, 300],
            [(this.canvas.width / 2) - 3 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 2 * this.widthHall, 300 + this.widthHall],
            [(this.canvas.width / 2) - 3 * this.widthHall, 200, (this.canvas.width / 2) - 3 * this.widthHall, 300],
            [(this.canvas.width / 2) - 2 * this.widthHall, 200, (this.canvas.width / 2) - 2 * this.widthHall, 300]
        ];
        for (let i = 0; i < level1.length; i++) {
            const x = level1[i][0];
            const y = level1[i][1];
            const x2 = level1[i][2];
            const y2 = level1[i][3];
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