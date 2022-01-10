import EndGame from './EndGame.js';
import GameLoop from './GameLoop.js';
import Scene from './Scene.js';
export default class Game {
    canvas;
    gameLoop;
    scene;
    endGame;
    isEnd;
    usernameProperty;
    passwordProperty;
    constructor(canvas) {
        this.canvas = canvas;
        this.usernameProperty = localStorage.getItem('username');
        this.passwordProperty = localStorage.getItem('password');
        this.scene = new Scene(this.canvas, this);
        this.gameLoop = new GameLoop(this);
        this.endGame = new EndGame(this.canvas, this);
    }
    get username() {
        return this.usernameProperty;
    }
    get password() {
        return this.passwordProperty;
    }
    start() {
        console.log(`Username: ${this.username}`);
        console.log(`Password: ${this.password}`);
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