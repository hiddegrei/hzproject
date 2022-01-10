import Room from "../Room.js";
import MGMain from "./MGMain.js";
export default class MiniGame7 extends MGMain {
    private ctx: CanvasRenderingContext2D;
    private combination: number[];
    private locked: boolean;
    private wheels: number[];
    private wheel: number;
    private position: number;

    constructor(ctx:CanvasRenderingContext2D,room:Room){
      super(7,room)
      this.ctx = ctx;
      this.roomId=7
      this.locked = true;
      this.combination = [];
      this.wheels = [];
      do {
        this.codeGenerator();
        this.generateStartPosition();
      } while (this.combination === this.wheels);
    }


    public update(){
      this.lockposition();
      this.locknumber()
    }

    public render(){

      this.writeTextToCanvas(`this is room`+this.roomId,20,200,200);
      Room.loadNewImage('assets/img/objects/pngwing.com (2).png');
      this.wheels.forEach((value: number, index: number) => this.writeTextToCanvas(`${value}`, 20, index * 10 + 100, 200));
    }

    private codeGenerator(){
      for (let i = 0; i < Room.randomNumber(0,9); i++) {
        this.combination.push(Room.randomNumber(0,9));
      }
      
      console.log(this.combination)
    }

    private generateStartPosition(){
      for (let i = 0; i < this.combination.length; i++) {
        this.wheels[i] = 0;
      }
      console.log(this.wheels)
    }

    private lockposition(){
      if (this.keyboard.isKeyDown(37)) {
        if(this.position === 0){
          this.position = this.wheels.length;
        } else {
          this.position--;
        }
      } else if (this.keyboard.isKeyDown(39)) {
        if(this.position === this.wheels.length){
          this.position = 0;
        } else {
          this.position++;
        }
      }
    }

    private locknumber(){
      if (this.keyboard.isKeyDown(40)) {
        this.decrement(this.wheel);
        this.check();
      } else if (this.keyboard.isKeyDown(38)) {
        this.increment(this.wheel);
        this.check();
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