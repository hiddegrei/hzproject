
import Game from "./Game.js";
import Border from "./Border.js";
import Ray from "./Ray.js";
import Particle from "./Particle.js";

export default class Scene {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    public game: Game;

    public borders: Array<Border> = []
    public particle = <any>{};
    public mouse = <any>{};


    static SPACE = 300;
    score;
    constructor(canvas: HTMLCanvasElement, game: Game) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.game = game;
        this.ctx = this.canvas.getContext('2d');

        this.score = 0;
        this.borders = []
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.canvas.width
            const y = Math.random() * this.canvas.height
            const x2 = Math.random() * this.canvas.width
            const y2 = Math.random() * this.canvas.height
            this.borders.push(new Border(x, y, x2, y2, this.ctx))
        }
        //this.border= new Border(300,50,300,200,this.ctx)
        // this.ray=new Ray(50,150, this.ctx)
        this.particle = new Particle(100, 100, this.ctx)
        this.mouse = { x: 0, y: 0 };

        //window.addEventListener("mousemove",this.mouseDown.bind(this), false)

    }
    processInput() {



    }

    mouseDown(e: MouseEvent) {

        // this.particle.update(window.event.clientX,window.event.clientY)
        this.mouse.x = e.clientX
        this.mouse.y = e.clientY

    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        //  for(let i=0;i<this.particle.rays.length;i++){
        //      this.particle.rays[i].cast(this.border)
        //  }
        //this.ray.cast(this.border)

        document.onmousemove = this.mouseDown.bind(this)
        this.particle.move(this.mouse.x, this.mouse.y, this.borders)





    }

    render() {

        //this.border.show()
        this.particle.show()
        // this.writeTextToCanvas("hi",100,100)
        for (let i = 0; i < this.borders.length; i++) {
            this.borders[i].show()
        }
        this.particle.look(this.borders)


    }


    writeTextToCanvas(text: string, xCoordinate: number, yCoordinate: number, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        //ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Scene.js.map