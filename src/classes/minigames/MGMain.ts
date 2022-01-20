import Game from "../Game";
import KeyboardListener from "../KeyboardListener";
import Room from "../Room";
import MiniGameSecrets from "./MiniGameSecrets";

export default class MGMain {
  public roomId: number;
  public room: Room;
  public keyboard: KeyboardListener;
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  private bezig: boolean;
  private bezig2: boolean;
  public timeLeft: number;

  public secretW: string[] = [];
  public attempts: number;
  public found!: any[] ;
  public index: number;
  public complete: any;
  public attemptsArr: Array<string> = [];
  public foundStr: string;
  public started: boolean;
  public image!: HTMLImageElement;

  public fname!: string;
  public lname!: string;
  public birth!: string;
  public habitat!: string;
  public age!: number;
  public hobbys!: string;

  public foundedArray: boolean[] = [];

 

  /**
   * Create an instance of this object
   * @param roomId number of the room the player is in
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
  constructor(roomId: number, room: Room, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, secret: string[] = [], found: any[] = []) {
    this.roomId = roomId;
    this.room = room;
    this.keyboard = new KeyboardListener();
    this.ctx = ctx;
    this.canvas = canvas;
    this.bezig = true;
    this.bezig2 = true;
    this.timeLeft = 120000;

    

    //let secrett = this.miniGameSecrets.getSecret();
    if (secret.length > 0) {
      let secrett = this.room.miniGameSecrets.getSecret(this.roomId);
      this.secretW = secret;
      this.found = found;
      for (let i = 0; i < this.found.length; i++) {
        if (this.found[i] === "-") {
          this.foundedArray[i] = true;
        }
      }
      this.fname = secrett[0][secrett[0].length - 6];
      this.lname = secrett[0][secrett[0].length - 5];
      this.age = secrett[0][secrett[0].length - 4];
      this.birth = secrett[0][secrett[0].length - 3];
      this.habitat = secrett[0][secrett[0].length - 2];
      this.hobbys = secrett[0][secrett[0].length - 1];
    }
    //  else {
    //   this.secretW = secrett[0];
    //   this.found = secrett[1];
    // }

    
   

    this.index = 0;
    this.attempts = 5;
    this.foundStr = "";
    // this.complete=false;
    this.started = true;
  }


  public startGame(){
    document.onkeydown = this.checkKey.bind(this);
      this.started = false;
      this.loadInfo()
      this.bezig=true

  }
  /**
   * Functie die bepaalt wat er gebeurt als het antwoord goed is
   */
  public answer() {
    if (this.bezig) {
      console.log("ji")
      this.bezig = false;
      this.room.answer = true;
      this.room.miniGameFinished = true;
      this.room.mgTimeLeft = this.timeLeft;
      if (this.roomId === 80) {
        this.loadInfo();
        this.attempts = 5;
        this.foundStr = "";
        this.attemptsArr = [];
        this.complete = null;
        this.index = 0;
      }
    }

    //   this.room.getHintsGame().foundHint('R');
  }

  /**
   * functie die bepaalt wat er gebeurt als het antwoord fout is
   */
  public answerWrong() {
    if (this.bezig2) {
      this.bezig2 = false;
    this.room.answer = false;
    this.room.miniGameFinished = true;
    this.complete=null
    this.attempts = 5;
    this.foundStr = "";
    this.attemptsArr = [];
    this.complete = null;
    this.index = 0;
    this.foundedArray=[]
    this.started=false
    this.loadInfo()

    if (this.roomId === 80) {
      this.room.scene.howGameEnded = "outofattempts";
      this.room.scene.game.isEnd = true;
    }
  }
  }

  public timer(elapsed: number) {
    this.timeLeft -= elapsed;
  }
  public renderTime() {
    this.writeTextToCanvas(`Time left: ${Math.round(this.timeLeft / 1000)}`, 20, 100, 60);
  }

  public alreadyFound(i: number) {
    if (this.foundedArray[i]) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks de keys pressed
   * @param e Key pressed
   */
  public checkKey(e: any) {
    //console.log(e.keyCode);
    if(this.attempts>=1){
    if (e.keyCode === 8) {
      if (this.index > 0) {
        this.index--;
      }

      if (!this.alreadyFound(this.index)) {
        this.found[this.index] = null;
      } else {
        let indexTest = this.index;

        while (indexTest >= 0 && this.alreadyFound(indexTest)) {
          indexTest--;
        }
        if (indexTest < 0) {
          this.index++;
        } else {
          this.index = indexTest;
          this.found[indexTest] = null;
        }
      }
    } else if (e.keyCode === 13) {
      this.checkAttempt();
    } else if (this.index <= this.found.length - 1) {
      for (let i = 0; i < this.found.length; i++) {
        if (this.found[i] === null) {
          this.index = i;
          break;
        }
      }
      //console.log(this.found[this.index])
      if (e.keyCode > 90 || e.keyCode < 65) {
        if (e.shiftKey && e.keyCode === 49) {
          this.found[this.index] = "!";
          this.index++;
        } else if (e.keyCode === 189) {
          this.found[this.index] = "-";
        } else if (!e.shiftKey) {
          this.found[this.index] = String.fromCharCode(e.keyCode);
        }
        if (!e.shiftKey) {
          this.index++;
        }
      } else {
        if (!e.shiftKey) {
          this.found[this.index] = String.fromCharCode(e.keyCode + 32);

          this.index++;
        }
      }
    }
  }
  }

  /**
   * Checkt the attempt
   */
  public checkAttempt() {
    for (let i = 0; i < this.found.length; i++) {
      this.foundStr += this.found[i];
    }
    this.attemptsArr.push(this.foundStr);
    this.foundStr = "";

    let complete = true;
    if (this.attempts >= 1) {
      for (let i = 0; i < this.found.length; i++) {
        if (this.found[i] === this.secretW[i]) {
          this.found[i] = this.secretW[i];
          this.foundedArray[i] = true;
        } else {
          this.found[i] = null;
          complete = false;
        }
      }
      for (let i = 0; i < this.found.length; i++) {
        if (this.found[i] === null) {
          this.index = i;
          break;
        }
      }

      if (complete) {
        this.complete = true;

        //setTimeout(this.answer,2000);
        setTimeout(this.answer.bind(this), 2000);
        //this.answer();
      } else if (this.attempts === 1) {
        this.complete = 0;

        setTimeout(this.answerWrong.bind(this), 2000);
      }
      this.attempts--;
    } else {
      this.complete = 0;

      setTimeout(this.answerWrong.bind(this), 2000);

      //this.answer();
    }
  }

  public loadInfo() {
    let secrett = this.room.miniGameSecrets.getSecret(this.roomId);
    this.secretW = secrett[0];
    this.found = secrett[1];

    this.fname = secrett[0][secrett[0].length - 6];
    this.lname = secrett[0][secrett[0].length - 5];
    this.age = secrett[0][secrett[0].length - 4];
    this.birth = secrett[0][secrett[0].length - 3];
    this.habitat = secrett[0][secrett[0].length - 2];
    this.hobbys = secrett[0][secrett[0].length - 1];
  }

  public renderAttemptsBlock() {
    this.ctx.strokeStyle = "rgb(0,0,0)";
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.beginPath();
    this.ctx.rect(100, 150, 700, 300);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
    this.writeTextToCanvas(`Je hebt nog ${this.attempts} pogingen om het wachtwoord te raden, na elke poging kun je zien welke`, 16, 110, 180);
    this.writeTextToCanvas("characters je goed hebt geraden", 16, 110, 200);

    this.writeTextToCanvas("Druk op ENTER  om je poging te testen.", 16, 110, 140, "rgb(0,255,0)");
    if (this.attemptsArr) {
      for (let i = 0; i < this.attemptsArr.length; i++) {
        this.writeTextToCanvas(`Poging ${i + 1}: ${this.attemptsArr[i]}`, 19, 110, 230 + i * 20);
      }
    }
  }

  public renderInfoBlock() {
    this.ctx.strokeStyle = "rgb(0,0,0)";
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.beginPath();
    this.ctx.rect(840, 150, 400, 300);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();

    if (this.roomId != 100) {
      this.writeTextToCanvas("Informatie die je hebt verkregen:", 20, 850, 180);
      this.writeTextToCanvas(`voornaam: ${this.fname}`, 20, 850, 210);
      this.writeTextToCanvas(`achternaam: ${this.lname}`, 20, 850, 240);

      this.writeTextToCanvas(`leeftijd: ${this.age}`, 20, 850, 270);

      this.writeTextToCanvas(`geboorte datum: ${this.birth}`, 20, 850, 300);

      this.writeTextToCanvas(`woonplaats: ${this.habitat}`, 20, 850, 330);
      this.writeTextToCanvas(`woonplaats: ${this.hobbys}`, 20, 850, 360);
    }
  }

  public renderPassBlocks() {
    let widthBlock: number;
    if (this.roomId != 100) {
      widthBlock = 50;
    } else {
      widthBlock = 40;
    }
    this.ctx.strokeStyle = "rgb(0,255,0)";
    this.ctx.beginPath();
    for (let i = 0; i < this.found.length; i++) {
      this.ctx.rect(2 * widthBlock + i * (2 * widthBlock), 500, widthBlock, widthBlock);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    for (let i = 1; i < this.found.length + 1; i++) {
      if (this.found[i - 1] != null) {
        this.writeTextToCanvas(this.found[i - 1], 40, i * (2 * widthBlock) + 10, 540, "rgb(0,255,0)");
      } else {
        this.writeTextToCanvas("*", 40, i * (2 * widthBlock) + 10, 550, "rgb(0,255,0)");
      }
    }
  }

  public renderStreepIndex() {
    let widthBlock: number;
    if (this.roomId != 100) {
      widthBlock = 50;
    } else {
      widthBlock = 40;
    }
    //streep waar de index is
    this.ctx.fillStyle = "rgb(0,255,0)";
    this.ctx.beginPath();
    if (this.index <= this.found.length - 1 && this.index > 0) {
      this.ctx.rect(2 * widthBlock + this.index * (2 * widthBlock), 540, widthBlock, 10);
    } else if (this.index <= 0) {
      this.ctx.rect(2 * widthBlock, 540, widthBlock, 10);
    } else {
      this.ctx.rect(2 * widthBlock + (this.found.length - 1) * (2 * widthBlock), 540, widthBlock, 10);
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  public renderComplete() {
    if (this.roomId != 80) {
      if (this.complete) {
        this.writeTextToCanvas(
          "Je hebt het wachtwoord geraden! Gebruik dus nooit je eigen gegevens in je wachtwoord, je ziet hoe makkelijk het is om dan je wachtwoord te raden!",
          20,
          100,
          window.innerHeight - 150,
          "rgb(0,255,0)"
        );
      } else if (this.complete === 0) {
        this.writeTextToCanvas("Helaas, dit is fout", 30, 100, 900, "rgb(0,255,0)");
      } else if (this.complete === 5) {
        this.writeTextToCanvas("Helaas, de tijd is op", 30, 100, 900, "rgb(0,255,0)");
      }
    } else {
      if (this.complete) {
        this.writeTextToCanvas(
          "Je hebt het wachtwoord geraden! Laat je niet nog een keer pakken!",
          20,
          100,
          window.innerHeight - 150,
          "rgb(0,255,0)"
        );
      } else if (this.complete === 0) {
        this.writeTextToCanvas("nope, geef maar op", 30, 100, 900, "rgb(0,255,0)");
      } else if (this.complete === 5) {
        this.writeTextToCanvas("Helaas, de tijd is op, je bent afgevoerd naar de gevangenis, amateur", 30, 100, 900, "rgb(0,255,0)");
      }
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
    color: string = "black",
    alignment: CanvasTextAlign = "start"
  ): void {
    this.ctx.font = `700 ${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
