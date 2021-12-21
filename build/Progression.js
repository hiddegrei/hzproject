import InfoDisplay from './InformationDisplay.js';
export default class Progression extends InfoDisplay {
    static BEGINXCOORDINATE = 1000;
    time;
    progression;
    xStart;
    xEnd;
    yStart;
    yEnd;
    constructor(canvas) {
        super(canvas);
        this.canvas = canvas;
        this.writeTextToCanvas('progress: ', this.canvas.width / 10 * 5, 20);
        this.xStart = this.canvas.width / 10 * 7;
        this.xEnd = this.canvas.width / 10 * 8;
        this.yStart = 15;
        this.yEnd = 15;
        this.progression = 100;
        this.writeTextToCanvas(`${this.progression}%`, this.canvas.width / 10 * 9, 20);
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
        this.xEnd = this.canvas.width / 10 * 8 + this.progression;
    }
    getProgression() {
        return this.progression;
    }
    getTime() {
        return this.time;
    }
}
//# sourceMappingURL=Progression.js.map