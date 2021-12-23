import EndGame from './EndGame.js';
import GameLoop from './GameLoop.js';
import Scene from './Scene.js';
import TimeLimit from './TimeLimit.js';
export default class Game {
    canvas;
    gameLoop;
    scene;
    endGame;
    isEnd;
    username;
    password;
    timeLimit;
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new Scene(this.canvas, this);
        this.gameLoop = new GameLoop(this);
        this.endGame = new EndGame(this.canvas, this);
<<<<<<< HEAD
        this.username = new URLSearchParams(document.location.search).get('username');
        this.password = new URLSearchParams(document.location.search).get('password');
        this.timeLimit = new TimeLimit(this.password).timeLimit;
    }
    start() {
        console.log('starting');
        console.log(`Time limit: ${this.timeLimit}`);
=======
        this.timeLimit = new TimeLimit(this.password);
    }
    start() {
>>>>>>> 0fa9840f56b9933e23de798fd329d1719d88e8ff
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