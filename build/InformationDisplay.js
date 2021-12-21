export default class InfoDisplay {
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=InformationDisplay.js.map