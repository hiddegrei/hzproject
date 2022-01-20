import Room from "../Room";
import MGMain from "./MGMain";

export default class Security extends MGMain {
  private static readonly DISTANCE = 100;

  private mouseX: number;

  private mouseY: number;

  private EndXLine1: number;

  private EndYLine1: number;

  private EndXLine2: number;

  private EndYLine2: number;

  private EndXLine3: number;

  private EndYLine3: number;

  /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
  constructor(ctx: CanvasRenderingContext2D, room: Room, canvas: HTMLCanvasElement) {
    super(15, room, ctx, canvas);
    this.EndXLine1 = 600;
    this.EndYLine1 = 500;
    this.EndXLine2 = 600;
    this.EndYLine2 = 600;
    this.EndXLine3 = 600;
    this.EndYLine3 = 700;
    this.mouseX = 100;
    this.mouseY = 100;
  }

  /**
   * Functie om de minigame te updaten
   */
  public update(mousex: number, mousey: number, elapsed: number) {
    this.mouseX = mousex;
    this.mouseY = mousey;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.timer(elapsed);
    if (this.started) {
      document.onkeydown = this.checkLocks.bind(this);
      this.started = false;
    }
    this.render();
  }

  /**
   * Functie om de minigame te renderen
   */
  public render() {
    this.ctx.drawImage(Room.loadNewImage("./img/background/nina-volkova-back13.jpg"), 0, 0, window.innerWidth, window.innerHeight);
    this.writeTextToCanvas("Dit is de bewakingskamer!", 25, this.canvas.width / 2 - 60, 200);
    this.writeTextToCanvas("Druk op E en gebruik je muis om het rechter uiteinde van een balk te verslepen", 25, this.canvas.width / 2 - 60, 220);
    // streepje
    this.createLine(400, 500, this.EndXLine1, this.EndYLine1, "rgb(20,20,20)");
    this.createLine(400, 600, this.EndXLine2, this.EndYLine2, "rgb(100,100,100)");
    this.createLine(400, 700, this.EndXLine3, this.EndYLine3, "rgb(200,200,200)");
  }

  private createLine(startX: number, startY: number, endX: number, endY: number, color: string) {
    //*******************************************************
    //                       |
    // Change color here     |
    //                       v
    //*******************************************************
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 20;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }

  /**
   * *******************************************
   * TO-DO check of deze functie niet useless is
   * *******************************************
   *
   * Check de locks
   * @param e Key pressed
   */
  public checkLocks(e: any) {
    this.checkKeyboard(e.keyCode);
  }

  /**
   * Check of de key pressed klopt
   * @param keycode Key pressed
   */
  private checkKeyboard(keycode: number) {
    console.log("key");
    if (
      keycode === 69 &&
      this.mouseX >= this.EndXLine1 - Security.DISTANCE &&
      this.mouseX <= this.EndXLine1 + Security.DISTANCE &&
      this.mouseX >= this.EndYLine1 - Security.DISTANCE &&
      this.mouseX <= this.EndYLine1 + Security.DISTANCE
    ) {
      this.EndXLine1 = this.mouseX;
      this.EndYLine1 = this.mouseY;
      console.log("1");
    } else if (
      keycode === 69 &&
      this.mouseX >= this.EndXLine2 - Security.DISTANCE &&
      this.mouseX <= this.EndXLine2 + Security.DISTANCE &&
      this.mouseX >= this.EndYLine2 - Security.DISTANCE &&
      this.mouseX <= this.EndYLine2 + Security.DISTANCE
    ) {
      this.EndXLine2 = this.mouseX;
      this.EndYLine2 = this.mouseY;
      console.log("2");
    } else if (
      keycode === 69 &&
      this.mouseX >= this.EndXLine3 - Security.DISTANCE &&
      this.mouseX <= this.EndXLine3 + Security.DISTANCE &&
      this.mouseX >= this.EndYLine3 - Security.DISTANCE &&
      this.mouseX <= this.EndYLine3 + Security.DISTANCE
    ) {
      this.EndXLine3 = this.mouseX;
      this.EndYLine3 = this.mouseY;
      console.log("3");
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
  public writeTextToCanvas(text: string, fontSize: number = 20, xCoordinate: number, yCoordinate: number, alignment: CanvasTextAlign = "start", color: string = "white"): void {
    this.ctx.font = `bold ${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
