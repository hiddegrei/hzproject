import Game from './Game.js';
import InfoDisplay from './InformationDisplay.js';
export default class EndGame extends InfoDisplay {
    scene;
    game;
    image;
    img;
    ctx;
    constructor(canvas) {
        super(canvas);
        this.ctx = this.canvas.getContext('2d');
    }
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    render() {
        this.drawImageScaled(this.ctx, './assets/img/background/product_image_bank-heist-4d_175f1d92e0631561ada7c2b1e91a2bde84ef47c112abba5b443d0f36fab4a134_opti.png');
        this.draw(this.ctx, './assets/img/objects/4541104.png', this.canvas.width / 25, this.canvas.height / 4.8);
        this.writeTextToCanvas('Kraak de kluis', this.canvas.width / 5, this.canvas.height / 10, 100, 'black');
        this.writeTextToCanvas('HighScore List', this.canvas.width / 6, this.canvas.height / 2.9, 25, 'black');
        this.writeTextToCanvas('1#   BugSlayer - 300 points', this.canvas.width / 6, this.canvas.height / 2.6);
    }
    draw(ctx, image, xPos, yPos) {
        this.image = Game.loadNewImage(image);
        ctx.drawImage(this.image, xPos, yPos);
    }
    drawImageScaled(ctx, img) {
        this.img = Game.loadNewImage(img);
        const canvass = ctx.canvas;
        const hRatio = canvass.width / this.img.width;
        const vRatio = canvass.height / this.img.height;
        const ratio = Math.min(hRatio, vRatio);
        ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.img.width * ratio, this.img.height * ratio);
    }
}
//# sourceMappingURL=EndGame.js.map