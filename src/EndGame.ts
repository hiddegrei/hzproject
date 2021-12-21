import Game from './Game.js';
import InfoDisplay from './InformationDisplay.js';
import Scene from './Scene.js';

export default class EndGame extends InfoDisplay {
  private scene: Scene;

  private game: Game;

  private image: HTMLImageElement;

  /**
   * constructor
   *
   * @param canvas canvas
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    const ctx = this.canvas.getContext('2d');
    this.draw(ctx);
    // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private draw(ctx:CanvasRenderingContext2D): void {
    this.image = Game.loadNewImage('./assets/img/objects/4541104.png');
    ctx.drawImage(this.image, this.canvas.width / 2, this.canvas.height / 2);
  }
}
