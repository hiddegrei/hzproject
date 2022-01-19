import Room from "../Room";
import MGMain from "./MGMain";
 import Game from "../Game";

export default class MiniGame9 extends MGMain{
   private static readonly RANDOMCODEWIDTH = 2.5;
   private static readonly LINECODE = 670;
   private counter: number[];
   private increase: boolean;
   private line: number;
   private locked: boolean;
   private randomCode: number[];
   private correctCode: number[];
    
    /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
      super(4,room,ctx, canvas);
      this.counter = [0, 0, 0];
      this.increase = true;
      this.line = 1;
      this.locked = true;
      this.correctCode = [];
      this.randomCode = [];
    }


  

  /**
   * Functie om de game te updaten
   */
    public update(elapsed:number){
      
      this.increaseOrDecrease(this.line);
      this.counterChange(this.line, this.line);
      
      this.timer(elapsed)
      if(this.started){
        document.onkeydown = this.checkKeyStop.bind(this);
        this.started=false
      }
      if(this.timeLeft<=0){
        this.complete=5
        setTimeout(this.answerWrong.bind(this), 2000);
  
        }

    }

    /**
     * Functie om de minigame te renderen
     */
    public render(){
      this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < 3; i++) {
        this.drawLines(i);
      }
      this.moveLine(this.line);
      this.writeTextToCanvas(`pogingen over: ${this.attempts}`, 30, window.innerWidth/7, window.innerHeight/4);
      this.writeTextToCanvas(`Gebruik "pijltje omlaag" om door te gaan naar het volgende blokje`, 20, window.innerWidth/3, 70);
      this.writeTextToCanvas(`Druk op "pijltje omlaag" als het blokje groen is`, 20, window.innerWidth/3, 100);

      if (this.locked === false) {
        this.writeTextToCanvas(`Goed gedaan`, 30, window.innerWidth/7, window.innerHeight/2);
      }
      if (this.line === 1) {
        for (let i = 0; i < 3; i++) {
          this.writeTextToCanvas(`[${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}]`, 15, MiniGame9.LINECODE, 175 + (150 * i));
        }
      } else if (this.line === 2) {
        for (let i = 1; i < 3; i++) {
          this.writeTextToCanvas(`[5] [6] [2] [9] [1]`, 15, MiniGame9.LINECODE, 175 + (150 * 0));
          this.writeTextToCanvas(`[${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}]`, 15, MiniGame9.LINECODE, 175 + (150 * i));
        }
      } else if (this.line === 3 && this.locked === true) {
        for (let i = 2; i < 3; i++) {
          this.writeTextToCanvas(`[5] [6] [2] [9] [1]`, 15, MiniGame9.LINECODE, 175 + (150 * 0));
          this.writeTextToCanvas(`[6] [8] [1] [0] [4]`, 15, MiniGame9.LINECODE, 175 + (150 * 1));
          this.writeTextToCanvas(`[${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}]`, 15, MiniGame9.LINECODE, 175 + (150 * i));
        }
      } else {
        this.writeTextToCanvas(`[5] [6] [2] [9] [1]`, 15, MiniGame9.LINECODE, 175 + (150 * 0));
        this.writeTextToCanvas(`[6] [8] [1] [0] [4]`, 15, MiniGame9.LINECODE, 175 + (150 * 1));
        this.writeTextToCanvas(`[2] [0] [4] [7] [3]`, 15, MiniGame9.LINECODE, 175 + (150 * 2));
      }
      
      
    
    


      //timer
	    this.renderTime()
        
    }

    private checkKeyStop(e:any) {
      if (e.keyCode === 40 && this.line===1 && this.counter[this.line - 1] >= 100 && this.counter[this.line - 1] <=200) {
        this.line++;
      } else if (e.keyCode === 40 && this.line===2 && this.counter[this.line - 1] >= 300 && this.counter[this.line - 1] <=400) {
        this.line++;
      } else if (e.keyCode === 40 && this.line===3 && this.counter[this.line - 1] >= 225 && this.counter[this.line - 1] <=275) {
        this.locked = false;
        setTimeout(this.answer.bind(this), 2000);
      } else if (e.keyCode === 40 && (this.line===2 || this.line === 3)) {
        this.attempts--;
        this.line = 1;
        if (this.attempts === 0) {
          setTimeout(this.answerWrong.bind(this), 2000);
        }
      } else if (e.keyCode === 40) {
        this.attempts--;
        if (this.attempts === 0) {
          setTimeout(this.answerWrong.bind(this), 2000);
        }
      }
    }

    private moveLine(line: number){
      if (line === 1) {
        this.drawCube(150, this.line);
        this.drawNoMoveCube(1);
        this.drawNoMoveCube(2);
      } else if (line === 2) {
        this.drawCube(300, this.line);
        this.drawNoMoveCube(0);
        this.drawNoMoveCube(2);
      } else if (line === 3) {
        this.drawCube(450,this.line);
        this.drawNoMoveCube(1);
        this.drawNoMoveCube(0);
      }
    }

    private drawCube(dy: number,line: number) {
      this.ctx.strokeStyle = "rgb(0,0,0)"
      if (this.line === 1 && this.counter[this.line - 1] >= 100 && this.counter[this.line - 1] <=200) {
        this.ctx.fillStyle = "rgb(0, 225, 0)";
      } else if (this.line===2 && this.counter[this.line - 1] >= 300 && this.counter[this.line - 1] <=400) {
        this.ctx.fillStyle = "rgb(0, 225, 0)";
      } else if (this.line===3 && this.counter[this.line - 1] >= 225 && this.counter[this.line - 1] <=275) {
        this.ctx.fillStyle = "rgb(0, 225, 0)";
      } else{
        this.ctx.fillStyle = "rgb(255,255,255)";
      }
      
      this.ctx.beginPath()
      this.ctx.rect(840+this.counter[line - 1], dy, 20, 50)
      this.ctx.closePath()
      this.ctx.stroke()
      this.ctx.fill()
    }

    private drawNoMoveCube(line: number) {
      this.ctx.strokeStyle = "rgb(0,0,0)"
      this.ctx.fillStyle = "rgb(255,255,255)"
      this.ctx.beginPath()
      this.ctx.rect(900, 150 + (150 * line), 20, 50)
      this.ctx.closePath()
      this.ctx.stroke()
      this.ctx.fill()
    }

    private increaseOrDecrease(line: number) {
      if (this.counter[line - 1] <=0) {
        this.increase = true;
      } else if (this.counter[line - 1] >=500) {
        this.increase = false;
      }
    }

    private drawLines(line: number) {
      this.ctx.strokeStyle = "rgb(0,0,0)";
      this.ctx.beginPath();
      this.ctx.moveTo(800, 175 + (150 * line));
      this.ctx.lineTo(1410, 175 + (150* line));
      this.ctx.stroke();
    }

    private counterChange(speed: number, line: number){
      if (this.increase === true) {
        this.counter[line - 1] += speed;
      } else {
        this.counter[line - 1] -= speed;
      }
    }
     
}
