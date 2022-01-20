import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";
import Hints from "../Hints";

export default class MiniGameC extends MGMain {
  /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
  constructor(ctx: CanvasRenderingContext2D, room: Room, canvas: HTMLCanvasElement) {
    super(100, room, ctx, canvas, room.hints.getAnswer(), room.hints.found);

    //this.image = Game.loadNewImage("./img/background/bankback.jpg");
  }

  /**
   * Functie om de game te updaten
   */
  public update(elapsed: number) {
    this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
    if (this.started) {
      document.onkeydown = this.checkKey.bind(this);
      this.started = false;
	
    }
  }

  /**
   * Functie om de minigame te renderen
   */
  public render() {
    //this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight);

    this.renderAttemptsBlock();
    this.renderInfoBlock();
    this.renderPassBlocks();
    this.renderStreepIndex();
    // this.renderComplete()

    this.writeTextToCanvas("Dit is de grote kluis", 20, 850, 180);
    this.writeTextToCanvas("Kraak de kluis met de verzamelde hints", 20, 850, 210);
    this.writeTextToCanvas("Hints: ", 20, 850, 230);
    this.room
      .getHintsGame()
      .getHint()
      .forEach((value: string, index: number) => {
        this.writeTextToCanvas(`${value}`, 20, 930 + index * 30, 230);
      });

    if (this.complete) {
      this.writeTextToCanvas("Je hebt het wachtwoord van de grote kluis geraden! ", 20, 100, window.innerHeight - 150,"rgb(0,255,0)");
    } else if (this.complete === 0) {
      this.writeTextToCanvas("Helaas, dit antwoord is fout", 30, 100, 900,"rgb(0,255,0)");
    } else if (this.complete === 5) {
      this.writeTextToCanvas("Helaas, de tijd is op", 30, 100, 900,"rgb(0,255,0)");
    }
  }
}
