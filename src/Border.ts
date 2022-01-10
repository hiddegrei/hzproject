import Vector from "./Vector.js";
import Game from "./Game.js"
export default class Border {

  public a:Vector;
  public b :Vector;
  public ctx: CanvasRenderingContext2D;
  public type:string
  public imageV:HTMLImageElement


  constructor(x1: number, y1: number, x2: number, y2: number, ctx: CanvasRenderingContext2D,type:string) {
    this.a = new Vector(x1,y1)
    this.b = new Vector(x2,y2)
    this.type=type

    this.ctx = ctx;
    this.type=type
    this.imageV=Game.loadNewImage("./assets/img/objects/walls1.png")

  }

  show() {
    if(this.type==="normal"){
    this.ctx.strokeStyle = "rgb(255,255,255)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x, this.a.y);
    this.ctx.lineTo(this.b.x, this.b.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill()
    if(this.a.y===this.b.y){
      let diffx=Math.abs(this.b.x-this.a.x)
      if(diffx<=100){
        this.ctx.drawImage(this.imageV,50,0,100,10,this.a.x,this.a.y-5,Math.abs(this.b.x-this.a.x),10)

      }else{
        
        for(let i=0;i<diffx;i+=50){

          
           if(i+50>diffx){
             this.ctx.drawImage(this.imageV,50,0,100,10,this.a.x+i,this.a.y-5,diffx-i,10)

           }else{
            this.ctx.drawImage(this.imageV,50,0,100,10,this.a.x+i,this.a.y-5,50,10)

           }

        }
      }
      
        
    
    }else{
     

    }
    }else{
      this.ctx.strokeStyle = "rgb(0,0,255)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x, this.a.y);
    this.ctx.lineTo(this.b.x, this.b.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill()

    }
  }
}