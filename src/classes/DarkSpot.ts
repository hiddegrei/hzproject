import Room from "./Room";
import Scene from "./Scene";
import Level1map from "./Level1map";

export default class DarkSpot extends Room {
    private level1Map: Level1map;
    
    
    public constructor(roomId:number,ctx:CanvasRenderingContext2D, scene:Scene,canvas:HTMLCanvasElement) {
        super(roomId,ctx,scene,canvas);
        this.level1Map = scene.getLevel();
        this.createAll()
    }

    public createAll() {
        this.createLShape();
        this.createBlock()
    }

    private createRec(dx:number, dy: number, width: number, height: number) {
        this.ctx.strokeStyle = "rgb(0,0,0)";
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.beginPath();
        this.ctx.rect(dx, dy, width, height);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }

    private createBlock() {
        // blok onder central hub
        this.createRec(915,604,240, 92);

        // streep onder minigame 1
        this.createRec(315,404,140, 43);

        // blok links van minigame 3
        this.createRec(465,604,140, 42);

        // blok boven minigame 5
        this.createRec(215,604,190, 92);

        // blok links-boven minigame 5
        this.createRec(65,554,90, 141);

        // links van minigame 5
        this.createRec(65,754,90, 142);

        // blok boven minigame 6
        this.createRec(465,704,140, 42);

        // links van minigame 6
        this.createRec(365,754,90, 142);

        // streepje rechts van minigame 7
        this.createRec(1215,854,190, 42);

        // streepje rechts van minigame 8
        this.createRec(1765,854,90, 42);

        // blok rechts van minigame 9
        this.createRec(1615,704,90, 92);
        
        // streepje links van minigame 9
        this.createRec(1215,754,140, 42);

        // blok links boven minigame 9
        this.createRec(1215,604,140, 92);

        // rechts naast minigame 13
        this.createRec(1565,155,140,90);

        // boven minigame 80
        this.createRec(1766,155,89,90);

        // streep links van minigame 80
        this.createRec(1565,354,190, 43);

        // blok onder minigame 80
        this.createRec(1715,454,140, 92);
    }

    /**
     * verticale balken eerst, daarna horizontale
     */
    private createLShape() {
        //Top bar
        this.createRec(0,0,50, 200);
        this.createRec(0,0,this.canvas.width, 100);
        
        // L figuur boven minigame 0
        this.createRec(265,154,41, 142);
        this.createRec(105,154,200, 43);

        // L figuur boven minigame 2
        this.createRec(965,154,41, 142);
        this.createRec(1005,254,150, 43);

        //blok om minigame 2
        this.createRec(615,254,90, 192);
        this.createRec(515,254,290, 43);
        this.createRec(515,404,190, 43);

        //L figuur om minigame 14
        this.createRec(865,154,41, 142);
        this.createRec(515,154,390, 43);

        //L figuur boven minigame 3
        this.createRec(665,504,41, 92);
        this.createRec(515,504,190, 43);

        //z figuur om minigame 11
        this.createRec(1465,454,40, 142);
        this.createRec(1265,454,210, 43);
        this.createRec(1465,556,190, 39);

        //L figuur boven minigame 7
        this.createRec(915,754,91, 141);
        this.createRec(915,754,240, 43);
        
        //L figuur rechts onder minigame 4
        this.createRec(815,754,41, 141);
        this.createRec(715,854,135, 43);
    }
}