import Game from './Game.js';
import InfoDisplay from './InformationDisplay.js';
export default class EndGame extends InfoDisplay {
    scene;
    game;
    image;
    constructor(canvas) {
        super(canvas);
        const ctx = this.canvas.getContext('2d');
        this.draw(ctx);
    }
    draw(ctx) {
        this.image = Game.loadNewImage('./assets/img/objects/4541104.png');
        ctx.drawImage(this.image, this.canvas.width / 2, this.canvas.height / 2);
    }
}
//# sourceMappingURL=EndGame.js.map