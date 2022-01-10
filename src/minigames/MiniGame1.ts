import Room from "../Room.js";
import MGMain from "./MGMain.js";

export default class MiniGame1 extends MGMain{
    public ctx:CanvasRenderingContext2D;
    

    constructor(ctx:CanvasRenderingContext2D,room:Room){
      super(1,room)
      this.ctx=ctx

    }


    public update(){
      if(this.keyboard.isKeyDown(65)){
        this.room.miniGameFinished=true
        this.room.answer=true
      }else if(this.keyboard.isKeyDown(66)||this.keyboard.isKeyDown(67)){
        this.room.miniGameFinished=true
        this.room.answer=false

      }

    }

    public render(){

        this.writeTextToCanvas(`this is room`+this.roomId,20,200,50)

        this.writeTextToCanvas("Wat is juist?",20,200,200)

        this.writeTextToCanvas("Gebruik een wachtwoord manager en 2-staps verificatie",20,400,250)
        this.writeTextToCanvas("press a",20,window.innerWidth/2,250)

        this.writeTextToCanvas("Gebruik het zelfde wachtwoord voor elke website ",20,400,300)
        this.writeTextToCanvas("press b",20,window.innerWidth/2,300)

        this.writeTextToCanvas("Gebruik een ander wachtwoord voor elke website en sla je wachtwoorden op in kladblok op je telefoon",20,400,350)
        this.writeTextToCanvas("press c",20,window.innerWidth/2,350)
        
        
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