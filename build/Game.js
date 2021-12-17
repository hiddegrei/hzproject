import GameLoop from "./GameLoop.js";
import Scene from "./Scene.js";
export default class Game {
    canvas;
    gameLoop;
    scene;
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new Scene(this.canvas, this);
        this.gameLoop = new GameLoop(this);
    }
    start() {
        console.log("starting");
        this.gameLoop.start();
    }
    processInput() {
        this.scene.processInput();
    }
    update(elapsed) {
        this.scene.update();
        return false;
    }
    render() {
        this.scene.render();
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Game.js.map