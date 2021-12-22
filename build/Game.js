import EndGame from './EndGame.js';
import GameLoop from './GameLoop.js';
import Scene from './Scene.js';
import TimeLimit from './TimeLimit.js';
export default class Game {
    canvas;
    gameLoop;
    scene;
    timeLimit;
    endGame;
    isEnd;
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new Scene(this.canvas, this);
        this.timeLimit = new TimeLimit('zwakww');
        this.gameLoop = new GameLoop(this);
        this.endGame = new EndGame(this.canvas);
    }
    start() {
        console.log('starting');
        console.log(`Time limit: ${this.timeLimit.timeLimit}`);
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