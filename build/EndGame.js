import Game from './Game.js';
import InfoDisplay from './InformationDisplay.js';
import KeyboardListener from './KeyboardListener.js';
export default class EndGame extends InfoDisplay {
    scene;
    game;
    image;
    img;
    ctx;
    keyboard;
    constructor(canvas, game) {
        super(canvas);
        this.ctx = this.canvas.getContext('2d');
        this.keyboard = new KeyboardListener();
        this.game = game;
    }
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (this.keyboard.isKeyDown(32)) {
            this.game.isEnd = false;
        }
    }
    render() {
        this.drawImageScaled(this.ctx, './assets/img/background/product_image_bank-heist-4d_175f1d92e0631561ada7c2b1e91a2bde84ef47c112abba5b443d0f36fab4a134_opti.png', 1, 1, 0, 0);
        this.draw(this.ctx, './assets/img/objects/4541104.png', this.canvas.width / 25, this.canvas.height / 4.8);
        this.drawImageScaled(this.ctx, './assets/img/background/the-button-859351_960_720.png', 0.34, 0.3, this.canvas.width / 30, -80);
        this.writeTextToCanvas('Kraak de kluis', this.canvas.width / 6, this.canvas.height / 15, 70, 'black');
        this.writeTextToCanvas('HighScore List', this.canvas.width / 6, this.canvas.height / 2.9, 25, 'black');
        this.writeTextToCanvas('1#   BugSlayer - 300 points', this.canvas.width / 6, this.canvas.height / 2.6);
    }
    draw(ctx, image, xPos, yPos) {
        this.image = Game.loadNewImage(image);
        ctx.drawImage(this.image, xPos, yPos);
    }
    drawImageScaled(ctx, img, imgWidth, imgHeight, xPos, yPos) {
        this.img = Game.loadNewImage(img);
        ctx.drawImage(this.img, 0, 0, this.img.width / imgWidth, this.img.height / imgHeight, xPos, yPos, window.innerWidth, window.innerHeight);
    }
}
//# sourceMappingURL=EndGame.js.map