import Game from "./Game";
import Room from "./Room";
import Vector from "./Vector"

export default class SpawnCookie{

    private canvas:HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private pos:Vector;
    private cookieIMG:HTMLImageElement;
    private widthHall: number;
    private possiblePos: Array<Vector>;
    public sleeping:boolean;
    public sleepTime:number
    private width:number;
    private height:number
    


    constructor(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D,widthHall: number){
        this.canvas=canvas
        this.ctx=ctx
       
        this.widthHall=widthHall
        this.width=40
        this.height=40
        this.cookieIMG=Game.loadNewImage("./img/objects/cookie.png")
        this.possiblePos=[new Vector(this.canvas.width / 2 - 9 * widthHall, 100 + 7 * widthHall),
            new Vector(this.canvas.width / 2 - 9 * widthHall, 100 + 2 * widthHall),
            new Vector(this.canvas.width / 2 - 2 * widthHall, 100 + 4 * widthHall),
            new Vector(this.canvas.width / 2 +4 * widthHall, 100 + 4 * widthHall),
            new Vector(this.canvas.width / 2 +9 * widthHall, 100 + 3 * widthHall),
            new Vector(this.canvas.width / 2 - 16 * widthHall, 100 + 8* widthHall),
            new Vector(this.canvas.width / 2 - 16 * widthHall, 100 + 12* widthHall),
        ]
        this.sleeping=false
        this.sleepTime=0
        this.pos=this.possiblePos[0]

    }
    public choosePos(){
        let ranNum=Room.randomNumber(0,this.possiblePos.length-1)
        this.pos=this.possiblePos[ranNum]
        
        

    }

    public eaten(particlePos: Vector){
        let middleCookie=new Vector(this.pos.x+0.5*this.width, this.pos.y+0.5*this.height)
        if(Vector.dist(middleCookie,particlePos)<this.width&&!this.sleeping){
            this.sleeping=true
            return true;

        }else{
            return false
        }
    }

    public show(){
        if(!this.sleeping){
            this.ctx.drawImage(this.cookieIMG,0,0,this.cookieIMG.width,this.cookieIMG.height,this.pos.x,this.pos.y,this.width,this.height)

        }
       


    }
}