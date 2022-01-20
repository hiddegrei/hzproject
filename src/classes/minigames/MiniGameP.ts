import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";

export default class MiniGameP extends MGMain {
  private lockedUp: number;

  /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
  constructor(ctx: CanvasRenderingContext2D, room: Room, canvas: HTMLCanvasElement) {
    super(80, room, ctx, canvas);
    this.lockedUp = 1;

    this.image = Game.loadNewImage("./img/background/cell2.jpg");
  }

  /**
   * Functie om de game te updaten
   */
  public update(lockedUp: number, elapsed: number) {
    this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
    this.timer(elapsed);
    if (this.started) {
      document.onkeydown = this.checkKey.bind(this);
      this.lockedUp = lockedUp;

     
	  this.startGame()
    }

    if (this.timeLeft <= 0) {
      this.complete = 5;
      setTimeout(this.answerWrong.bind(this), 2000);
    }
  }

  /**
   * Functie om de minigame te renderen
   */
  public render() {
    this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight);

    this.writeTextToCanvas("Je bent opgesloten door de bewakers! En de bewakers hebben een wachtwoord op de deur gezet! ", 16, 110, 90);
    this.writeTextToCanvas("Hack het wachtwoord om vrij te komen", 16, 110, 110);

	if(this.found){
    this.renderAttemptsBlock();
    this.renderInfoBlock();
    this.renderPassBlocks();
    this.renderStreepIndex();
    this.renderComplete();

    //this.writeTextToCanvas("Informatie van de bewaker die het wachtwoord heeft verzonnen:",20,850,130);

    //timer
    this.renderTime();
	}
  }
}
