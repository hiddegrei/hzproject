import Game from './Game.js';
import HighScores from './HighScores.js';
import InfoDisplay from './InformationDisplay.js';
import KeyboardListener from './KeyboardListener.js';
export default class EndGame extends InfoDisplay {
    game;
    image;
    img;
    ctx;
    keyboard;
    gameloop;
    highscores;
    scene;
    constructor(canvas, game, scene) {
        super(canvas);
        this.ctx = this.canvas.getContext('2d');
        this.keyboard = new KeyboardListener();
        this.game = game;
        this.highscores = new HighScores();
        this.highscores.highscores;
        console.log(this.game.username);
        this.highscores.addHighscore(this.game.username, 999, this.game.password);
        this.scene = scene;
    }
    update() {
        document.querySelectorAll('div.hud').forEach((element) => { element.remove(); });
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (this.keyboard.isKeyDown(32)) {
            this.game.isEnd = false;
        }
    }
    render() {
        let limit;
        this.drawImageScaled(this.ctx, './assets/img/background/product_image_bank-heist-4d_175f1d92e0631561ada7c2b1e91a2bde84ef47c112abba5b443d0f36fab4a134_opti.png', 1, 1, 0, 0);
        this.draw(this.ctx, './assets/img/objects/4541104.png', this.canvas.width / 25, this.canvas.height / 4.8);
        this.drawImageScaled(this.ctx, './assets/img/background/the-button-859351_960_720.png', 0.34, 0.3, this.canvas.width / 30, -80);
        this.writeTextToCanvas('Kraak de kluis', this.canvas.width / 6, this.canvas.height / 15, 70, 'black');
        this.writeTextToCanvas('HighScores', this.canvas.width / 6, this.canvas.height / 2.9, 25, 'black');
        if (this.highscores.highscores.length > 10) {
            limit = 10;
        }
        else {
            limit = this.highscores.highscores.length;
        }
        for (let index = 0; index < limit; index++) {
            this.writeTextToCanvas(`#${index + 1} - ${this.highscores.highscores[index][0]} - ${this.highscores.highscores[index][1]} Punten`, this.canvas.width / 5.85, ((this.canvas.height / 2.6) + (((this.canvas.height / 1.4) - (this.canvas.height / 2.6)) / 10) * index));
        }
        this.ctx.strokeStyle = "rgb(255,0,0)";
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.beginPath();
        this.ctx.rect(window.innerWidth - 400, 280, 300, 100);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        if (this.scene.howGameEnded === "caught") {
            this.writeTextToCanvas("Je bent gepakt door de politie!", window.innerWidth - 200, 300);
        }
        if (this.scene.howGameEnded === "gekraakt") {
            this.writeTextToCanvas("Je hebt de bank gekraakt, gefeliciteerd!", window.innerWidth - 200, 300);
        }
        if (this.scene.howGameEnded === "outofattempts") {
            this.writeTextToCanvas("Je poging om de bank te kraken duurde te lang, je bent gepakt door de politie", window.innerWidth - 200, 300);
        }
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