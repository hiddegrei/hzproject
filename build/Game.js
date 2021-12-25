import EndGame from './EndGame.js';
import GameLoop from './GameLoop.js';
import Scene from './Scene.js';
export default class Game {
    canvas;
    gameLoop;
    scene;
    endGame;
    isEnd;
    username;
    password;
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new Scene(this.canvas, this);
        this.gameLoop = new GameLoop(this);
        this.endGame = new EndGame(this.canvas, this);
        this.username = new URLSearchParams(document.location.search).get('username');
        this.password = new URLSearchParams(document.location.search).get('password');
    }
    start() {
        this.gameLoop.start();
    }
    processInput() {
        this.scene.processInput();
    }
    update(elapsed) {
        if (this.isEnd) {
            this.endGame.update();
        }
        else {
            this.scene.update(elapsed);
        }
        return false;
    }
    render() {
        if (this.isEnd) {
            this.endGame.render();
        }
        else {
            this.scene.render();
        }
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