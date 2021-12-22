import EndGame from './EndGame.js';
import GameLoop from './GameLoop.js';

import Scene from './Scene.js';

import TimeLimit from './TimeLimit.js';

export default class Game {
  public canvas: HTMLCanvasElement;

  public gameLoop: GameLoop;

  public scene: Scene;

  private timeLimit: TimeLimit;

  private endGame:EndGame;

  public isEnd:boolean;

  /**
   * @param canvas
   */
  constructor(canvas: HTMLElement) {
    this.canvas = canvas as HTMLCanvasElement;
    this.scene = new Scene(this.canvas, this);
    this.timeLimit = new TimeLimit('zwakww');
    this.gameLoop = new GameLoop(this);
    this.endGame = new EndGame(this.canvas);
  }

  /**
   *
   */
  public start() {
    console.log('starting');
    console.log(`Time limit: ${this.timeLimit.timeLimit}`);
    this.gameLoop.start();
  }

  /**
   *
   */
  public processInput() {
    this.scene.processInput();
  }

  /**
   * @param elapsed
   */
  public update(elapsed: number) {
    if (this.isEnd) {
      this.endGame.update();
    } else {
      this.scene.update();
    }
    // this.scene.update()

    return false;
  }

  /**
   *
   */
  public render() {
    if (this.isEnd) {
      this.endGame.render();
    } else {
      this.scene.render();
    }
    // this.scene.render();
  }

  /**
   * @param source
   */
  static loadNewImage(source: string) {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * @param min
   * @param max
   */
  static randomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
// # sourceMappingURL=Game.js.map
