export default class Level1map {
    level1;
    ctx;
    widthHall;
    widthCentralHub;
    heightCentralHub;
    canvas;
    constructor(canvas, ctx) {
        this.widthHall = 40;
        this.ctx = ctx;
        this.canvas = canvas;
        this.level1 = [
            [0, 0, this.canvas.width, 0],
            [0, 0, 0, this.canvas.height],
            [this.canvas.width, 0, this.canvas.width, this.canvas.height],
            [0, this.canvas.height, this.canvas.width, this.canvas.height],
            [100, 100, this.canvas.width / 2, 100],
            [100, 100 + this.widthHall, (this.canvas.width / 2) - this.widthHall, 100 + this.widthHall],
            [this.canvas.width / 2, 100, this.canvas.width / 2, 300],
            [(this.canvas.width / 2) - this.widthHall, 100 + this.widthHall, (this.canvas.width / 2) - this.widthHall, 300],
            [(this.canvas.width / 2) - 2 * this.widthHall, 300, (this.canvas.width / 2) - this.widthHall, 300],
            [(this.canvas.width / 2) - 3 * this.widthHall, 200, (this.canvas.width / 2) - 3 * this.widthHall, 300],
            [(this.canvas.width / 2) - 2 * this.widthHall, 200, (this.canvas.width / 2) - 2 * this.widthHall, 300],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall]
        ];
    }
}
//# sourceMappingURL=Level1map.js.map