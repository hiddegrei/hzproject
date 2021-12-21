export default class Level1map {
    level1 = [];
    ctx;
    widthHall;
    widthCentralHub;
    heightCentralHub;
    canvas;
    constructor(canvas, ctx) {
        this.widthHall = 50;
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
            [(this.canvas.width / 2) - 3 * this.widthHall, 200 + this.widthHall, (this.canvas.width / 2) - 3 * this.widthHall, 300],
            [(this.canvas.width / 2) - 2 * this.widthHall, 200 + this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall, 300],
            this.turnRD((this.canvas.width / 2) - 4 * this.widthHall, 100 + 2 * this.widthHall)[0],
            this.turnRD((this.canvas.width / 2) - 4 * this.widthHall, 100 + 2 * this.widthHall)[1],
            this.turnRD((this.canvas.width / 2) - 4 * this.widthHall, 100 + 2 * this.widthHall)[2],
            this.turnRD((this.canvas.width / 2) - 4 * this.widthHall, 100 + 2 * this.widthHall)[3],
            this.makeHallH((this.canvas.width / 2) - 9 * this.widthHall, 100 + 2 * this.widthHall, 5 * this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) - 9 * this.widthHall, 100 + 2 * this.widthHall, 5 * this.widthHall)[1],
            this.makeHallV((this.canvas.width / 2) - 10 * this.widthHall, 100 + 3 * this.widthHall, 2 * this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2) - 10 * this.widthHall, 100 + 3 * this.widthHall, 2 * this.widthHall)[1],
            this.makeHallV((this.canvas.width / 2) - 10 * this.widthHall, 100 + 6 * this.widthHall, this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2) - 10 * this.widthHall, 100 + 6 * this.widthHall, this.widthHall)[1],
            [(this.canvas.width / 2) - 9 * this.widthHall, 100 + 4 * this.widthHall, (this.canvas.width / 2) - 7 * this.widthHall, 100 + 4 * this.widthHall],
            [(this.canvas.width / 2) - 9 * this.widthHall, 100 + 6 * this.widthHall, (this.canvas.width / 2) - 7 * this.widthHall, 100 + 6 * this.widthHall],
            [(this.canvas.width / 2) - 7 * this.widthHall, 100 + 4 * this.widthHall, (this.canvas.width / 2) - 7 * this.widthHall, 100 + 6 * this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2), 300 + this.widthHall],
            [(this.canvas.width / 2) + this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall],
            [this.canvas.width / 2, 300, (this.canvas.width / 2) + 4 * this.widthHall, 300],
            [(this.canvas.width / 2) + 4 * this.widthHall, 300, (this.canvas.width / 2) + 4 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall, 300, (this.canvas.width / 2) - 3 * this.widthHall, 300],
            [(this.canvas.width / 2) - 5 * this.widthHall, 300, (this.canvas.width / 2) - 5 * this.widthHall, 300 + 3 * this.widthHall],
            [(this.canvas.width / 2) - 9 * this.widthHall, 300 + 3 * this.widthHall, (this.canvas.width / 2) - 5 * this.widthHall, 300 + 3 * this.widthHall],
            [(this.canvas.width / 2) - 9 * this.widthHall, 300 + 4 * this.widthHall, (this.canvas.width / 2) - 5 * this.widthHall, 300 + 4 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall, 300 + 4 * this.widthHall, (this.canvas.width / 2) - 5 * this.widthHall, 300 + 6 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall, 300 + 6 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall, 300 + 6 * this.widthHall],
            [(this.canvas.width / 2) - 2 * this.widthHall, 300 + 6 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall, 300 + 8 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall, 300 + 8 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall, 300 + 8 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall, 300 + 9 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall, 300 + 9 * this.widthHall],
            [(this.canvas.width / 2) - 8 * this.widthHall, 300 + 9 * this.widthHall, (this.canvas.width / 2) - 6 * this.widthHall, 300 + 9 * this.widthHall],
            [(this.canvas.width / 2) - 7 * this.widthHall, 300 + 9 * this.widthHall, (this.canvas.width / 2) - 7 * this.widthHall, 300 + 11 * this.widthHall],
            [(this.canvas.width / 2) - 3 * this.widthHall, 300 + 9 * this.widthHall, (this.canvas.width / 2) - 3 * this.widthHall, 300 + 11 * this.widthHall],
            [(this.canvas.width / 2) - 7 * this.widthHall, 300 + 11 * this.widthHall, (this.canvas.width / 2) - 3 * this.widthHall, 300 + 11 * this.widthHall],
            [(this.canvas.width / 2) - this.widthHall, 300 + 6 * this.widthHall, (this.canvas.width / 2) - this.widthHall, 300 + 8 * this.widthHall],
            [(this.canvas.width / 2) - this.widthHall, 300 + 6 * this.widthHall, (this.canvas.width / 2) + 4 * this.widthHall, 300 + 6 * this.widthHall],
            [(this.canvas.width / 2) + 4 * this.widthHall, 300 + 6 * this.widthHall, (this.canvas.width / 2) + 4 * this.widthHall, 300 + 8 * this.widthHall],
            this.makeHallH((this.canvas.width / 2) - this.widthHall, 300 + 8 * this.widthHall, 5 * this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) - this.widthHall, 300 + 8 * this.widthHall, 5 * this.widthHall)[1],
            this.makeHallV((this.canvas.width / 2) - 2 * this.widthHall, 300 + 9 * this.widthHall, 3 * this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2) - 2 * this.widthHall, 300 + 9 * this.widthHall, 3 * this.widthHall)[1],
            this.makeHallH((this.canvas.width / 2) - 5 * this.widthHall, 300 + 12 * this.widthHall, 3 * this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) - 5 * this.widthHall, 300 + 12 * this.widthHall, 3 * this.widthHall)[1],
        ];
    }
    makeHallH(x, y, w) {
        let l1 = [x, y, x + w, y];
        let l2 = [x, y + this.widthHall, x + w, y + this.widthHall];
        return [l1, l2];
    }
    makeHallV(x, y, h) {
        let l1 = [x, y, x, y + h];
        let l2 = [x + this.widthHall, y, x + this.widthHall, y + h];
        return [l1, l2];
    }
    turnRD(x, y) {
        let l1 = [x, y, x + 2 * this.widthHall, y];
        let l2 = [x, y + this.widthHall, x + this.widthHall, y + this.widthHall];
        let l3 = [x + this.widthHall, y + this.widthHall, x + this.widthHall, y + 2 * this.widthHall];
        let l4 = [x + 2 * this.widthHall, y, x + 2 * this.widthHall, y + 2 * this.widthHall];
        return [l1, l2, l3, l4];
    }
    turnLD(x, y) {
        let l1 = [x, y, x - 2 * this.widthHall, y];
        let l2 = [x, y + this.widthHall, x - this.widthHall, y + this.widthHall];
        let l3 = [x - this.widthHall, y + this.widthHall, x - this.widthHall, y + 2 * this.widthHall];
        let l4 = [x - 2 * this.widthHall, y, x - 2 * this.widthHall, y + 2 * this.widthHall];
        return [l1, l2, l3, l4];
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Level1map.js.map