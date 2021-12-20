import Scene from "./Scene.js"
export default class Level1map {

    public level1: Array<any>=[];
    public ctx: CanvasRenderingContext2D;
    public widthHall: number;
    public widthCentralHub: number;
    public heightCentralHub: number;
    public canvas: HTMLCanvasElement

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.widthHall = 40;
        this.ctx = ctx;
        this.canvas = canvas

        this.level1 = [//side borders
            [0, 0, this.canvas.width, 0],
            [0, 0, 0, this.canvas.height],
            [this.canvas.width, 0, this.canvas.width, this.canvas.height],
            [0, this.canvas.height, this.canvas.width, this.canvas.height],
            //


            [100, 100, this.canvas.width / 2, 100],
            [100, 100 + this.widthHall, (this.canvas.width / 2) - this.widthHall, 100 + this.widthHall],

            [this.canvas.width / 2, 100, this.canvas.width / 2, 300],
            [(this.canvas.width / 2) - this.widthHall, 100 + this.widthHall, (this.canvas.width / 2) - this.widthHall, 300],

            [(this.canvas.width / 2) - 2 * this.widthHall, 300, (this.canvas.width / 2) - this.widthHall, 300],
            [(this.canvas.width / 2) - 3 * this.widthHall, 200, (this.canvas.width / 2) - 3 * this.widthHall, 300],
            [(this.canvas.width / 2) - 2 * this.widthHall, 200, (this.canvas.width / 2) - 2 * this.widthHall, 300],

            //central hub
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) , 300 + this.widthHall],
            [(this.canvas.width / 2) +  this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall],

            [this.canvas.width / 2, 300, (this.canvas.width / 2)+4*this.widthHall,300],
            //rechts van hub
            [(this.canvas.width / 2)+4*this.widthHall,300, (this.canvas.width / 2)+4*this.widthHall,300+5 * this.widthHall],
            //links van hub
            [(this.canvas.width / 2) - 5 * this.widthHall, 300, (this.canvas.width / 2) - 3 * this.widthHall, 300],
            [(this.canvas.width / 2) - 5 * this.widthHall,300, (this.canvas.width / 2) - 5 * this.widthHall,300+3 * this.widthHall],
            [(this.canvas.width / 2) - 9 * this.widthHall,300+3 * this.widthHall, (this.canvas.width / 2) - 5 * this.widthHall,300+3 * this.widthHall],
            [(this.canvas.width / 2) - 9 * this.widthHall,300+4 * this.widthHall, (this.canvas.width / 2) - 5 * this.widthHall,300+4 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall,300+4 * this.widthHall, (this.canvas.width / 2) - 5 * this.widthHall,300+6 * this.widthHall],

            [(this.canvas.width / 2) - 5 * this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall,300+6 * this.widthHall],
            [(this.canvas.width / 2) - 2 * this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall,300+8 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall,300+8 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall,300+8 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall,300+9 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall,300+9 * this.widthHall],
            [(this.canvas.width / 2) - 8 * this.widthHall,300+9 * this.widthHall, (this.canvas.width / 2) - 6 * this.widthHall,300+9 * this.widthHall],
            [(this.canvas.width / 2) - 7 * this.widthHall,300+9 * this.widthHall, (this.canvas.width / 2) - 7 * this.widthHall,300+11 * this.widthHall],
            [(this.canvas.width / 2) - 3 * this.widthHall,300+9 * this.widthHall, (this.canvas.width / 2) - 3 * this.widthHall,300+11 * this.widthHall],
            [(this.canvas.width / 2) - 7 * this.widthHall,300+11 * this.widthHall, (this.canvas.width / 2) - 3 * this.widthHall,300+11 * this.widthHall],

            [(this.canvas.width / 2) -   this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) -  this.widthHall,300+8 * this.widthHall],
            [(this.canvas.width / 2) -   this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) +4* this.widthHall,300+6 * this.widthHall],
            [(this.canvas.width / 2) +4* this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) +4* this.widthHall,300+8 * this.widthHall],

            this.makeHallH((this.canvas.width / 2) -   this.widthHall,300+8 * this.widthHall,5*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) -  this.widthHall,300+8 * this.widthHall,5*this.widthHall)[1],

            this.makeHallV((this.canvas.width / 2) -   2*this.widthHall,300+9 * this.widthHall,3*this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2) -   2*this.widthHall,300+9 * this.widthHall,3*this.widthHall)[1],

            this.makeHallH((this.canvas.width / 2) -   5*this.widthHall,300+12 * this.widthHall,3*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) -  5*this.widthHall,300+12 * this.widthHall,3*this.widthHall)[1],


            
            

        ]
    
        
    }

    public makeHallH(x:number,y:number,w:number){
        let l1=[x,y,x+w,y];
        let l2=[x,y+this.widthHall,x+w,y+this.widthHall]
        return [l1,l2]

    }
    public makeHallV(x:number,y:number,h:number){
        let l1=[x,y,x,y+h];
        let l2=[x+this.widthHall,y,x+this.widthHall,y+h]
        return [l1,l2]

    }
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