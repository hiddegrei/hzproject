export default class Border {

  public a = <any>{};
  public b = <any>{};
  public ctx: CanvasRenderingContext2D;


  constructor(x1: number, y1: number, x2: number, y2: number, ctx: CanvasRenderingContext2D) {
    this.a = { x: x1, y: y1 };
    this.b = { x: x2, y: y2 };

    this.ctx = ctx

  }

  show() {
    this.ctx.strokeStyle = "rgb(255,255,255)";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x, this.a.y);
    this.ctx.lineTo(this.b.x, this.b.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill()
  }
}