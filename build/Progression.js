export default class Progression {
    static BEGINXCOORDINATE = 1000;
    time;
    canvas;
    progression;
    xStart;
    xEnd;
    yStart;
    yEnd;
    constructor(canvas) {
        this.canvas = canvas;
        this.writeTextToCanvas('progress: ', 850, 20);
        this.xStart = 900;
        this.xEnd = Progression.BEGINXCOORDINATE;
        this.yStart = 15;
        this.yEnd = 15;
        this.progression = 100;
        this.writeTextToCanvas(`${this.progression}%`, Progression.BEGINXCOORDINATE + 50, 20);
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    pBar(ctx) {
        ctx.strokeStyle = '#800080';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(this.xStart, this.yStart);
        ctx.lineTo(this.xEnd, this.yEnd);
        ctx.stroke();
    }
    setXEnd() {
        this.xEnd = Progression.BEGINXCOORDINATE + this.progression;
    }
    getProgression() {
        return this.progression;
    }
    getTime() {
        return this.time;
    }
}
//# sourceMappingURL=Progression.js.map