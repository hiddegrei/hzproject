import Room from "../Room.js";
import MGMain from "./MGMain.js";

export default class MiniGame7 extends MGMain {
    private ctx: CanvasRenderingContext2D;
    private combination: number[];
    private locked: boolean;
    private wheels: number[];
    private position: number;
    private lockImage: HTMLImageElement;
    private canvas: HTMLCanvasElement;
    private time: number;
    private positionKeyPressed: boolean;
    private numberKeyPressed: boolean;
    private timeIncrement: number;
<<<<<<< HEAD
    private randomNumberPositionDX: number[];
    private randomNumberPositionDY: number[];
    private randomSize: number[];
=======
    private started:boolean
    
>>>>>>> 7d65ab8ef10e413008bbf4e8551a47262eda473d

    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
      super(7,room)
      this.canvas = canvas;
      this.ctx = ctx;
      this.roomId=7;
      this.locked = true;
      this.combination = [];
      this.wheels = [];
      this.position = 0;
      this.time = 0;
      this.positionKeyPressed = false;
      this.numberKeyPressed = false;
      this.timeIncrement = 0;
<<<<<<< HEAD
      this.randomNumberPositionDX = [];
      this.randomNumberPositionDY = [];
      this.randomSize = [];
=======
      this.started=true
>>>>>>> 7d65ab8ef10e413008bbf4e8551a47262eda473d
      do {
        this.codeGenerator();
        this.generateStartPosition();
      } while (this.combination === this.wheels);
      this.combination.forEach((value:number) => {
        this.randomNumberPositionDX.push(Room.randomNumber(10*value,(window.innerWidth/1.1)));
        this.randomNumberPositionDY.push(Room.randomNumber(10*value,(window.innerHeight/1.1)));
        this.randomSize.push(Room.randomNumber(15,25));
      })
      
      //document.onkeydown=this.checkLocks.bind(this)
    }


    public update(){
      this.check();
      if(this.started){
        document.onkeydown = this.checkLocks.bind(this);
        this.started=false
      }
     
      if (this.time >= 100) {
        this.time = 0;
        this.positionKeyPressed = false;
        this.numberKeyPressed = false;
      }
      this.time++;
    }

    public checkLocks(e:any){
      console.log(e.keyCode)
      this.lockposition(e.keyCode);
      this.locknumber(e.keyCode);

    }

    public render(){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      Room.drawImageScaled(
        this.ctx,
        'assets/img/background/bank-room-interior-backdrop-metal-safe-door-vault-background-racks-deposit-boxes-secure-currency-storage-inside-174243488.jpg',
        1,
        1,
        0,
        35,
        );
      this.lockImage = Room.loadNewImage('assets/img/objects/4541104.png');
      this.ctx.drawImage(this.lockImage,-20, window.innerHeight/6);
      this.explanation();
      this.lockImage = Room.loadNewImage('assets/img/objects/pngwing.com (500).png');
      this.ctx.drawImage(this.lockImage,window.innerWidth / 3, -12);
      this.wheels.forEach((value: number, index: number) => {
        if (this.position === index) {
          this.writeTextToCanvas(
            `[${value}]`,
            50, 997 - (index * 54.5),
            513,
            'center',
            'green',
          )
        } else {
            this.writeTextToCanvas(
              `${value}`,
              50, 997 - (index * 54.5),
              513,
            )
          }
        });
      this.hints();
    }

    private codeGenerator(){
      for (let i = 0; i < Room.randomNumber(1,5); i++) {
        this.combination.push(Room.randomNumber(0,9));
      }
      
      console.log(this.combination);
    }

    private generateStartPosition(){
      for (let i = 0; i < this.combination.length; i++) {
        this.wheels[i] = 0;
      }
      console.log(this.wheels);
    }

    private lockposition(keycode:number){
      if (this.wheels.length !== 1) {
        if (keycode===37 ) {
          if(this.position === this.wheels.length - 1){
            this.position = 0;
          } else {
            this.position++;
          }
          this.positionKeyPressed = true;
        } else if (keycode===39 ) {
          if(this.position === 0){
            this.position = this.wheels.length -1;
          } else {
            this.position--;
          }
          this.positionKeyPressed = true;
        }
      }
    }

    private locknumber(keycode:number){
      if (keycode===40 ) {
        this.decrement(this.position);
        this.numberKeyPressed = true;
      } else if (keycode===38 ) {
        this.increment(this.position);
        this.numberKeyPressed = true;
      }
    }

    private explanation() {
      this.writeTextToCanvas(`this is room`+this.roomId,20,window.innerWidth/3,window.innerHeight/1.1);
      this.writeTextToCanvas(`Try to unlock this lock`,20,225,300);
      this.writeTextToCanvas(`using the arrow keys`,20,225,325);
      this.writeTextToCanvas(`Arrow up = number up`,20,225,400);
      this.writeTextToCanvas(`Arrow down = number down`,20,225,450);
      this.writeTextToCanvas(`Arrow left = position left`,20,225,500);
      this.writeTextToCanvas(`Arrow right = position right`,20,225,550);
    }

    private hints(){
      this.combination.forEach((value: number, index: number) => {
        this.writeTextToCanvas(`${value}`,this.randomSize[index],this.randomNumberPositionDX[index],this.randomNumberPositionDY[index], 'center', 'orange');
      })
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
      if (this.combinationCheck() === true) {
        this.locked = false;
        setTimeout(this.answer.bind(this),4000)
      } else {
        this.locked = true;
      }
    }

    private answer(){
      this.room.miniGameFinished = true;
      this.room.answer = true;
    }

    private combinationCheck(): boolean {
      let boolean = true;
      for (let i = 0; i < this.wheels.length; i++) {
        if (this.wheels[i].valueOf() !== this.combination[i].valueOf()) {
          boolean = false;
        }
      }
      if(boolean === true) {
        return true;
      } else {
        return false;
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