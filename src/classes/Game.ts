import EndGame from "./EndGame";
import GameLoop from "./GameLoop";
import Scene from "./Scene";
import Tutorial from "./Tutorial";

export default class Game {
  public canvas: HTMLCanvasElement;

  public gameLoop: GameLoop;

  public scene: Scene;

  private endGame: EndGame;

  public isEnd: boolean | undefined;

  private tutorial: Tutorial;

  /**
   * @param canvas
   */
  constructor(canvas: any, time: number) {
    this.canvas = canvas as HTMLCanvasElement;
    this.gameLoop = new GameLoop(this);
    this.scene = new Scene(this.canvas, this, time);
    this.endGame = new EndGame(this.canvas, this, this.scene);
    this.isEnd = false;
    this.tutorial = new Tutorial(this);
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
      let removeTutorial = () => { this.tutorial.removeTutorial(); };
    if (this.gameLoop.frameCount === 1) {
      this.gameLoop.pause();
      this.tutorial.displayTutorial();
      document.querySelector('#tutorialButton')?.addEventListener('click', removeTutorial);
    } else {
      if (this.isEnd) {
        this.endGame.update();
      } else {
        this.scene.update(elapsed);
      }
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
