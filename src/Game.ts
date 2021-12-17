import GameLoop from "./GameLoop.js";

import Scene from "./Scene.js";

export default class Game {
    public canvas: HTMLCanvasElement;
    public gameLoop: GameLoop;
    public scene: Scene;

    constructor(canvas: HTMLElement) {
        this.canvas = canvas as HTMLCanvasElement;
        this.scene = new Scene(this.canvas, this);

        this.gameLoop = new GameLoop(this);

    }
    public start() {
        console.log("starting");
        this.gameLoop.start();
    }

    public processInput() {

        this.scene.processInput();

    }
    public update(elapsed: number) {

        this.scene.update();

        return false;
    }

    public render() {

        this.scene.render();

    }
    static loadNewImage(source: string) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Game.js.map