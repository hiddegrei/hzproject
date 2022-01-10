import Room from "../Room.js";
import MGMain from "./MGMain.js";

export default class MiniGame2 extends MGMain{
    public ctx:CanvasRenderingContext2D;
    private secretW:Array<string>=[]
    private attempts:number
    private found:any[]
    private index:number;
    private complete:any
    

    constructor(ctx:CanvasRenderingContext2D,room:Room){
      super(2,room)
      this.ctx=ctx
      this.secretW=["1","7","1","s","m","i","t","h"]
      this.found=[0,0,0,0,0,0,0,0]
      //window.addEventListener('keydown',this.checkKey,false);
      document.onkeydown = this.checkKey.bind(this);
      this.index=0
      this.attempts=5
     // this.complete=false

    }

  public checkKey(e:any) {
      //console.log(e.keyCode)
      if(e.keyCode===8){
        this.found[this.index--]=0
        //this.index--
      }else if(e.keyCode===13){
        this.checkAttempt()
      }else if(this.index<=7){
        for(let i=0;i<this.found.length;i++){
          if(this.found[i]===0){
            this.index=i
            break;
          }
        }
        console.log(this.found[this.index])
        if(e.keyCode<=57){
          this.found[this.index]=String.fromCharCode(e.keyCode)

        }else{
          this.found[this.index]=String.fromCharCode(e.keyCode+32)
        }
        
        this.index++
      }

      

  }

  public checkAttempt(){
    let complete=true
    if(this.attempts<=5){
    for(let i=0;i<this.secretW.length;i++){
      if(this.found[i]===this.secretW[i]){
        this.found[i]=this.secretW[i]
      }else{
        this.found[i]=0
        complete=false
      }
    }
    for(let i=0;i<this.found.length;i++){
      if(this.found[i]===0){
        this.index=i
        break;
      }
    }
    this.attempts--
    if(complete){
      this.complete=true
     
      //setTimeout(this.answer,2000)
      this.answer()
     
    }
  }else{
    this.complete=0
   this.answer()
  }
  }

  public answer(){
    this.room.miniGameFinished=true
    this.room.answer=true
    

  }


    public update(){
      this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);

    }

    public render(){
      this.ctx.strokeStyle="rgb(0,255,0)"
        this.ctx.beginPath()
        this.ctx.rect(100,100,600,300)
        this.ctx.closePath()
        this.ctx.stroke()
        this.writeTextToCanvas("Je hebt 5 pogingen om het wachtwoord te raden, na elke poging kun je zien welke",16,110,130)
        this.writeTextToCanvas("character je goed hebt geraden",16,110,150)

        this.writeTextToCanvas("PRESS ENTER  om je poging te testen.",16,110,25)


        this.ctx.beginPath()
        this.ctx.rect(700,100,300,500)
        this.ctx.closePath()
        this.writeTextToCanvas("Informatie je hebt verkregen:",20,750,100)
        this.writeTextToCanvas("voornaam: Rik",20,750,130)
        this.writeTextToCanvas("voornaam: Smith",20,750,160)
        this.writeTextToCanvas("leeftijd: 17",20,750,190)
        this.writeTextToCanvas("geboorte datum: 17/10/2001",20,750,220)
        this.writeTextToCanvas("woonplaats: Utrecht",20,750,250)

        this.ctx.beginPath()
        this.ctx.rect(100,500,50,50)
        this.ctx.rect(200,500,50,50)
        this.ctx.rect(300,500,50,50)
        this.ctx.rect(400,500,50,50)
        this.ctx.rect(500,500,50,50)
        this.ctx.rect(600,500,50,50)
        this.ctx.rect(700,500,50,50)
        this.ctx.rect(800,500,50,50)
        this.ctx.closePath()
        this.ctx.stroke()


        for(let i=1;i<9;i++){
          if(this.found[i-1]!=0){
            this.writeTextToCanvas(this.found[i-1],40,i*100+10,540)

          }else{
            this.writeTextToCanvas("*",40,i*100+10,550)

          }
        }

        if(this.complete){
          this.writeTextToCanvas("Je hebt het wachtwoord geraden!",30,100,900)
        }else if(this.complete===0){
          this.writeTextToCanvas("not good",30,100,900)

        }
        
        // this.writeTextToCanvas("*",40,210,550)
        // this.writeTextToCanvas("*",40,310,550)
        // this.writeTextToCanvas("*",40,410,550)
        // this.writeTextToCanvas("*",40,510,550)
        // this.writeTextToCanvas("*",40,610,550)
        // this.writeTextToCanvas("*",40,710,550)
        // this.writeTextToCanvas("*",40,810,550)

        
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
    color: string = 'red',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}