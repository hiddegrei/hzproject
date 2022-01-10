import Room from "../Room.js";
import MGMain from "./MGMain.js";
export default class MiniGame7 extends MGMain {
    private ctx: CanvasRenderingContext2D;
    private combination: number[];
    private locked: boolean;
    private wheels: number[];
    private wheel: number;

    constructor(ctx:CanvasRenderingContext2D,room:Room){
      super(7,room)
      this.ctx = ctx;
      this.roomId=7
      this.locked = true;
      this.codeGenerator();
      this.generateStartPosition();
    }


    public update(){
      this.lockposition()
    }

    public render(){

        this.writeTextToCanvas(`this is room`+this.roomId,20,200,200)
        
    }

    private codeGenerator(){
      for (let i = 0; i < Math.round(Room.randomNumber(0,9)); i++) {
        this.combination.push(Math.round(Room.randomNumber(0,9))) 
      }
    }

    private generateStartPosition(){
      this.combination.forEach((index: number) => this.wheels.push(0));
    }

    private lockposition(){
      if (this.keyboard.isKeyDown(37)) {
        if(this.wheel === 0){
          this.wheel = this.wheels.length;
        } else {
          this.wheel--;
        }
      }
    }

    // ***
    // Combination Lock
    // ***

    private increment(wheel: number) {
      if (this.wheels[wheel] === 9) {
        this.wheels[wheel] = 0;
      } else {
        this.wheels[wheel]++;
      }
    }

    private decrement(wheel: number) {
      if (this.wheels[wheel] === 0) {
        this.wheels[wheel] = 9;
      } else {
        this.wheels[wheel]--;
      }
    }

    private check() {
      if (this.combination === this.wheels) {
        this.locked = false;
      } else {
        this.locked = true;
      }
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