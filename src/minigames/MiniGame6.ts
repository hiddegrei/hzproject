export default class MiniGame6{
    public ctx:CanvasRenderingContext2D;
    public roomId:number;

    constructor(ctx:CanvasRenderingContext2D){
        this.ctx=ctx
        this.roomId=6

    }


    public update(){

    }

    public render(){

        this.writeTextToCanvas(`this is room`+this.roomId,20,200,200)
        
    }

     /**
   * @param text
   * @param xCoordinate
   * @param yCoordinate
   * @param fontSize
   * @param color
   * @param alignment
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'center',
    color: string = 'red',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}