import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";

export default class MiniGameKraakPass extends MGMain {
  /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
  constructor(ctx: CanvasRenderingContext2D, room: Room, canvas: HTMLCanvasElement) {
    super(2, room, ctx, canvas);
  }

  /**
   * Functie om de game te updaten
   */
  public update(elapsed: number) {
    this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
    this.timer(elapsed);
    if (this.started) {
      
      this.startGame()
    }

    if (this.timeLeft < 0) {
      this.complete = 5;
      setTimeout(this.answerWrong.bind(this), 2000);
    }
  }

  /**
   * Functie om de minigame te renderen
   */
  public render() {
    // this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight)

    if(this.found){
      this.renderAttemptsBlock();
    this.renderInfoBlock();
    this.renderPassBlocks();
    this.renderStreepIndex();
    this.renderComplete();

    //timer
    this.renderTime();

    }
    
  }
}
