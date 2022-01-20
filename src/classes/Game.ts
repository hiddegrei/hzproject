import EndGame from "./EndGame";
import GameLoop from "./GameLoop";
import UserData from "./UserData";
import Scene from "./Scene";

export default class Game {
  public canvas: HTMLCanvasElement;

  public gameLoop: GameLoop;

  public scene: Scene;

  private endGame: EndGame;

  public isEnd: boolean | undefined;

  public userData: UserData;

  /**
   * @param canvas
   */
  constructor(canvas: any, time: number) {
    this.canvas = canvas as HTMLCanvasElement;
    this.userData = new UserData();
    this.scene = new Scene(this.canvas, this, time);
    this.gameLoop = new GameLoop(this);
    this.endGame = new EndGame(this.canvas, this, this.scene);
    this.isEnd = false;
  }

  /**
   *
   */
  public start() {
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
      this.scene.update(elapsed);
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
