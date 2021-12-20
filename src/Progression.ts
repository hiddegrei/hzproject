export default class Progression {
  private static readonly BEGINXCOORDINATE = 1000;

  private time: number;

  private canvas: HTMLCanvasElement;

  private progression: number;

  private xStart: number;

  private xEnd: number;

  private yStart: number;

  private yEnd: number;

  /**
   * initialize an instance of this object
   *
   * @param canvas canvas
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.writeTextToCanvas('progress: ', 850, 20);
    this.xStart = 900;
    this.xEnd = Progression.BEGINXCOORDINATE;
    this.yStart = 15;
    this.yEnd = 15;
    this.progression = 100;
    this.writeTextToCanvas(`${this.progression}%`, Progression.BEGINXCOORDINATE + 50, 20);
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The color of the text
   * @param alignment - Where to align the text
   */
  public writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize: number = 20,
    color: string = 'red',
    alignment: CanvasTextAlign = 'center',
  ): void {
    const ctx = this.canvas.getContext('2d');
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * progressbar rendering
   *
   * @param ctx ctx
   */
  public pBar(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = '#800080';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(this.xStart, this.yStart);
    ctx.lineTo(this.xEnd, this.yEnd);
    ctx.stroke();
  }

  /**
   * set the progressbar
   */
  public setXEnd(): void {
    this.xEnd = Progression.BEGINXCOORDINATE + this.progression;
  }

  /**
   * Get progression
   *
   * @returns progression
   */
  public getProgression(): number {
    return this.progression;
  }

  /**
   * Get the time
   *
   * @returns the time
   */
  public getTime(): number {
    return this.time;
  }
}
