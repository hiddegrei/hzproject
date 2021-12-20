import Scene from "./Scene.js"
export default class Level1map{

    public level1;
    public ctx:CanvasRenderingContext2D;
    public widthHall:number;
    public widthCentralHub:number;
    public heightCentralHub:number;
    public canvas:HTMLCanvasElement

    constructor(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
        this.widthHall = 40;
        this.ctx=ctx;
        this.canvas=canvas
       
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
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall]
        
           // [this.canvas.width / 2, 300, (this.canvas.width / 2)+this.widthHall,300]
        ]
        
        }
    
}