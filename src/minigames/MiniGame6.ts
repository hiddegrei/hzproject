import Room from "../Room.js";
import MGMain from "./MGMain.js";

export default class MiniGame6 extends MGMain{
    public ctx:CanvasRenderingContext2D;
    private fullFingerprint: HTMLImageElement[];
    private partFingerprint: HTMLImageElement[];
    private randomNumber: number;
    

    constructor(ctx:CanvasRenderingContext2D,room:Room){
      super(6,room)
      this.ctx=ctx
      this.fullFingerprint = [Room.loadNewImage('assets/img/fingerPrints/resized-fingerprint-1382652_1920.jpg'),Room.loadNewImage('assets/img/fingerPrints/resized-detective-fingerprints-print.png'),Room.loadNewImage('assets/img/fingerPrints/resized-istockphoto-534450004-612x612.jpg')];
      this.partFingerprint = [Room.loadNewImage('assets/img/fingerPrints/detective-fingerprints-arch.png'),Room.loadNewImage('assets/img/fingerPrints/detective-fingerprints-loop.png'),Room.loadNewImage('assets/img/fingerPrints/detective-fingerprints-whorl.png')];
      this.randomNumber = Room.randomNumber(0,2);
    }


    public update(){

    }

    public render(){
      this.writeTextToCanvas(`this is room`+this.roomId,20,200,200)
      this.writeTextToCanvas(`match the fingerprint with the smaller ones`, 20, window.innerWidth / 2, window.innerHeight / 8)
      this.loadFingerPrints();
        
    }

    private loadFingerPrints() {
      this.ctx.drawImage(this.fullFingerprint[this.randomNumber], window.innerWidth / 3, window.innerHeight/3);
      this.partFingerprint.forEach((value: HTMLImageElement, index: number) => this.ctx.drawImage(value, window.innerWidth / 1.5, window.innerHeight / 4 * (index + 1)))
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