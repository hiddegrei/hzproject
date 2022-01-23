import Room from "../Room";
import MGMain from "./MGMain";

export default class Security extends MGMain {
    private static readonly DX = 720;
    private static readonly DY = 400;
    private static readonly EXTRA = 60;
    private static readonly SIZE = 60;

    private width: number;

    private widthCop: number;

    private status: string;

    private testImg: HTMLImageElement;

    private flash: number;

    private count: number;

    private locked: boolean;
  

    

  	/**
     * Create an instance of this object
     * @param ctx canvas rendering context 2D
     * @param room A room
     * @param canvas canvas
     */
  	constructor(ctx: CanvasRenderingContext2D, room: Room, canvas: HTMLCanvasElement) {
    	super(15, room, ctx, canvas);
        this.width = 0;
        this.widthCop = 10;
        this.status = `Hacking: ${Math.floor(this.width/5)}%`;
        this.testImg = Room.loadNewImage("./img/objects/gold_trophytest.png");
        this.flash = 1;
        this.count = 0;
        this.locked = false;
  	}

  	/**
     * Functie om de minigame te updaten
     */
  	public update(elapsed:number) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.status = `Hacking: ${Math.round(this.width/5)}%`;
		  this.timer(elapsed)
      	if(this.started && this.locked === false){
        	document.onkeydown = this.checkLocks.bind(this);
        	this.started=false;
      	}
        if (this.count>=10) {
            if (this.widthCop>=0) {
                if (this.widthCop >= 500) {
                    this.widthCop = 504;
                    this.locked = true;
                    console.log("1");
                    this.room.scene.particle.sendToJail(this.canvas,this.room.scene.level.widthHall)
                    setTimeout(this.answerWrong.bind(this),2000)
                    
                }
                this.widthCop -= 2;
            }
            this.count = 0;
        }
        this.count++;
  	}

   

  	/**
     * Functie om de minigame te renderen
     */
  	public render() {
        this.ctx.drawImage(Room.loadNewImage("./img/background/product-computer-1.png"),635,300,600,500)
        this.writeTextToCanvas("Dit is de bewakingskamer!",25,(this.canvas.width/2)-20,this.canvas.height/12,"center","white");
        this.writeTextToCanvas("Houd E ingedrukt om het systeem te hacken",25,(this.canvas.width/2)-30,this.canvas.height/10 + 10,"center","white");
        this.writeTextToCanvas(`${this.status}`,25,(this.canvas.width/2)-20,this.canvas.height/1.1,"center","green");
        this.writeTextToCanvas(`gevaar niveau`,25,(this.canvas.width/6),this.canvas.height/4,"center",`rgb(255,${255-(this.widthCop/2)},0)`);
        // hacking bar
        this.createRec(500,"rgb(0,0,0)",680,580, 50);
        this.createRec(this.width,"rgb(0,255,0)",680,580, 50);
        // agent bar
        this.createRec(50,"rgb(0,0,0)",this.canvas.height/4+ 50,this.canvas.width/2.4, -500);
        this.createRec(50,`rgb(255,${255-(this.widthCop/2)},0)` ,this.canvas.height/4 + 50,this.canvas.width/2.4, -this.widthCop);
        
        if (this.width <=150) {
            for (let i = 0; i < 3; i++) {
              this.writeTextToCanvas(`[${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}]`, Security.SIZE, Security.DX, Security.DY + (Security.EXTRA * i));
            }
          } else if (this.width <= 300) {
            for (let i = 1; i < 3; i++) {
              this.writeTextToCanvas(`[5] [6] [2] [9] [1]`, Security.SIZE, Security.DX, Security.DY + (Security.EXTRA * 0));
              this.writeTextToCanvas(`[${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}]`, Security.SIZE, Security.DX, Security.DY + (Security.EXTRA * i));
            }
          } else if (this.width <= 500) {
            for (let i = 2; i < 3; i++) {
              this.writeTextToCanvas(`[5] [6] [2] [9] [1]`, Security.SIZE, Security.DX, Security.DY + (Security.EXTRA * 0));
              this.writeTextToCanvas(`[6] [8] [1] [0] [4]`, Security.SIZE, Security.DX, Security.DY + (Security.EXTRA * 1));
              this.writeTextToCanvas(`[${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}] [${Room.randomNumber(0,9)}]`, Security.SIZE, Security.DX, Security.DY + (Security.EXTRA * i));
            }
          } else {
            this.writeTextToCanvas(`[5] [6] [2] [9] [1]`, Security.SIZE, Security.DX, Security.DY + (Security.EXTRA * 0));
            this.writeTextToCanvas(`[6] [8] [1] [0] [4]`, Security.SIZE, Security.DX, Security.DY + (Security.EXTRA * 1));
            this.writeTextToCanvas(`[2] [0] [4] [7] [3]`, Security.SIZE, Security.DX, Security.DY + (Security.EXTRA * 2));
          }
          if (this.widthCop >= 500) {
              this.allAgentAlert()
          } else if (this.widthCop >=400) {
            if (this.flash <= 20) {
                this.redFlash()
                this.flash++;
              } else if (this.flash >= 50) {
                this.flash = 1;
              } else {
                this.flash++;
              }
        }
    }

    private createRec(width: number, color:string, dx: number, dy:number, height: number) {
        //*******************************************************
        //                       |
        // Change color here     |
        //                       v
        //*******************************************************
        this.ctx.strokeStyle = "rgb(0,0,0)";
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(dx, dy, width, height);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }

    /**
	 * *******************************************
	 * TO-DO check of deze functie niet useless is
	 * *******************************************
	 *  
	 * Check de locks
	 * @param e Key pressed
	 */
     public checkLocks(e:any){
        this.checkKeyboard(e.keyCode);
  }

    /**
	 * Check of de key pressed klopt
	 * @param keycode Key pressed
	 */
     private checkKeyboard(keycode: number){
        if (keycode === 69 && this.locked===false) {
            if (this.width >= 500) {
                setTimeout(this.answerWrong.bind(this),2000);
                for (let i = 0; i < this.room.scene.cameraAgents.length; i++) {
                    this.room.scene.cameraAgents[i].setInActive()
                }
            } else {
                this.width++;
                if (this.widthCop>500) {
                  this.locked = true;
                  console.log("2");
                    setTimeout(this.answerWrong.bind(this),2000)
                } else {
                    this.widthCop += 3;
                }
                
            }
        }
    }

    public directorAlert(number: number) {
        let ctxAlert = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        if (number === 1) {
          ctxAlert.strokeStyle = "rgb(0,0,0)";
          ctxAlert.fillStyle = "rgb(255,0,0,0.5)";
          ctxAlert.beginPath();
          ctxAlert.rect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
          ctxAlert.closePath();
          ctxAlert.stroke();
          ctxAlert.fill();
        }
    
        ctxAlert.drawImage(this.testImg, 100, 100);
        ctxAlert.strokeStyle = "rgb(0,0,0)";
        ctxAlert.fillStyle = "rgb(255,255,255)";
        ctxAlert.beginPath();
        ctxAlert.rect(0, 290, 470, 50);
        ctxAlert.closePath();
        ctxAlert.stroke();
        ctxAlert.fill();
    
        ctxAlert.font = `30px sans-serif`;
        ctxAlert.fillStyle = 'red';
        ctxAlert.textAlign = 'left';
        ctxAlert.fillText("Directeur: M. Oney", 200, 330);
    
        ctxAlert.strokeStyle = "rgb(0,0,0)";
        ctxAlert.fillStyle = "rgb(255,255,255)";
        ctxAlert.beginPath();
        ctxAlert.ellipse(450, 100, 150, 140, Math.PI / 4, 0, 2 * Math.PI);
        ctxAlert.closePath();
        ctxAlert.stroke();
        ctxAlert.fill();
        this.writeTextToCanvas(`We hebben de inbreker!`, 24, 310, 100,"left","red");
        this.writeTextToCanvas(`gevonden!`, 24, 320, 120, "left","red");
      }

    public allAgentAlert() {
        if (this.flash <= 20) {
          this.directorAlert(1);
          this.flash++;
        } else if (this.flash >= 50) {
          this.directorAlert(0);
          this.flash = 1;
        } else {
          this.directorAlert(0);
          this.flash++;
        }
      
    }

    private redFlash() {
        this.ctx.strokeStyle = "rgb(0,0,0)";
          this.ctx.fillStyle = "rgb(255,0,0,0.1)";
          this.ctx.beginPath();
          this.ctx.rect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
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
      alignment: CanvasTextAlign = 'start',
      color: string = 'Green',
    ): void {
      this.ctx.font = `bold ${fontSize}px sans-serif`;
      this.ctx.fillStyle = color;
      this.ctx.textAlign = alignment;
      this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
