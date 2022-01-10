import EndGame from './EndGame.js';
import GameLoop from './GameLoop.js';

import Scene from './Scene.js';

export default class Game {
  public canvas: HTMLCanvasElement;

  public gameLoop: GameLoop;

  public scene: Scene;

  private endGame:EndGame;

  public isEnd:boolean;

  private usernameProperty: string;

  private passwordProperty: string;

  /**
   * @param canvas
   */
  constructor(canvas: HTMLElement) {
    this.canvas = canvas as HTMLCanvasElement;
    this.usernameProperty = localStorage.getItem('username');
    this.passwordProperty = localStorage.getItem('password');
    // Username and password properties must be initialized before an instance of the scene class is created!
    this.scene = new Scene(this.canvas, this);
    this.gameLoop = new GameLoop(this);
    this.endGame=new EndGame(this.canvas,this)
  }

  public get username() {
    return this.usernameProperty;
  }

  public get password() {
    return this.passwordProperty;
  }

  /**
   *
   */
  public start() {
    console.log(`Username: ${this.username}`);
    console.log(`Password: ${this.password}`);
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
