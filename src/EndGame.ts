import Game from './Game.js';
import InfoDisplay from './InformationDisplay.js';
import Scene from './Scene.js';

export default class EndGame extends InfoDisplay {
  private scene: Scene;

  private game: Game;

  private image: HTMLImageElement;

  private img: HTMLImageElement;

  private ctx: CanvasRenderingContext2D;

  /**
   * constructor
   *
   * @param canvas canvas
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.ctx = this.canvas.getContext('2d');
    // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * update the endscreen
   */
  public update(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Render the endscreen
   */
  public render(): void {
    this.drawImageScaled(this.ctx, './assets/img/background/product_image_bank-heist-4d_175f1d92e0631561ada7c2b1e91a2bde84ef47c112abba5b443d0f36fab4a134_opti.png');
    this.draw(this.ctx, './assets/img/objects/4541104.png', this.canvas.width / 25, this.canvas.height / 4.8);
    this.writeTextToCanvas('Kraak de kluis', this.canvas.width / 5, this.canvas.height / 10, 100, 'black');
    this.writeTextToCanvas('HighScore List', this.canvas.width / 6, this.canvas.height / 2.9, 25, 'black');
    this.writeTextToCanvas('1#   BugSlayer - 300 points', this.canvas.width / 6, this.canvas.height / 2.6);
  }

  private draw(ctx:CanvasRenderingContext2D, image: string, xPos: number, yPos: number): void {
    this.image = Game.loadNewImage(image);
    ctx.drawImage(this.image, xPos, yPos);
  }

  private drawImageScaled(ctx: CanvasRenderingContext2D, img: string) {
    this.img = Game.loadNewImage(img);
    const canvass = ctx.canvas;
    const hRatio = canvass.width / this.img.width;
    const vRatio = canvass.height / this.img.height;
    const ratio = Math.min(hRatio, vRatio);
    // const centerShiftX = (canvass.width - this.img.width * ratio) / 2;
    // const centerShiftY = (canvass.height - this.img.height * ratio) / 2;
    ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      0,
      0,
      this.img.width * ratio,
      this.img.height * ratio,
    );
  }
}
