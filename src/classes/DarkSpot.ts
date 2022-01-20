import Room from "./Room";
import Scene from "./Scene";
import Level1map from "./Level1map";

export default class DarkSpot extends Room {
    private level1Map: Level1map;
    private img1:HTMLImageElement;
    private img2:HTMLImageElement;
    private img3:HTMLImageElement;
    private img4:HTMLImageElement;
    private img5:HTMLImageElement;
    private img6:HTMLImageElement;
    private img7:HTMLImageElement;
    private img8:HTMLImageElement;
    private img9:HTMLImageElement;
    private img10:HTMLImageElement;
    //private img11:HTMLImageElement;

    
    
    public constructor(roomId:number,ctx:CanvasRenderingContext2D, scene:Scene,canvas:HTMLCanvasElement) {
        super(roomId,ctx,scene,canvas);
        this.level1Map = scene.getLevel();
        this.img1=Room.loadNewImage("./img/background/42e41e7460483a2f00bb7bd16fe3b9f3.jpg")
        this.img2=Room.loadNewImage("./img/background/cartoon-illustration-bank-vault-inside-metallic-iron-safe-door_1441-2029.jpg")
        this.img3=Room.loadNewImage("./img/background/depositphotos_66872185-stock-photo-top-view-office-room-wooden.jpg")
        this.img4=Room.loadNewImage("./img/background/nina-volkova-back13.jpg")
        this.img5=Room.loadNewImage("./img/background/36064143-vector-illustration-of-a-closed-safe-with-money-.jpg")
        this.img6=Room.loadNewImage("./img/background/verlichtingsplan.jpg")
        this.img7=Room.loadNewImage("./img/background/vector-cartoon-illustration-bank-robbery-safety-vault-three-thieves-stealing-gold-cash-throwing-bag-sack-currency-119359066.jpg")
        this.img8=Room.loadNewImage("./img/background/9da45f21d0d2f59c2c335e3651f43621--small-bedrooms-perspective.jpg")
        this.img9=Room.loadNewImage("./img/background/145739320-empty-meeting-room-semi-flat-rgb-color-vector-illustration-conference-coffee-break-documents-and-com.webp")
        this.img10=Room.loadNewImage("./img/background/56b19636ec2dc3f52f4092e9d4527213.jpg")
        this.createAll()
    }

    public createAll() {
        this.createLShape();
        this.createBlock();
        this.loadAllImages();
    }

    private createRec(dx:number, dy: number, width: number, height: number) {
        //*******************************************************
        //                       |
        // Change color here     |
        //                       v
        //*******************************************************
        this.ctx.strokeStyle = "rgb(105,105,105)";
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.ctx.beginPath();
        this.ctx.rect(dx, dy, width, height);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }

    private loadAllImages() {
     this.insertRoomImages(this.img1, 160, 754, 100, 95);
        this.insertRoomImages(this.img2, 610,751,200 ,103);
        this.insertRoomImages(this.img3, 1265,300,240 ,100);
        this.insertRoomImages(this.img4, 710,600,150 ,100);
        this.insertRoomImages(this.img5, 1410,150,100 ,100);
       this.insertRoomImages(this.img6, 1410,700,149 ,100);
       this.insertRoomImages(this.img7, 462,751,100 ,149);
       this.insertRoomImages(this.img8, 1762,600,100 ,200);
        this.insertRoomImages(this.img9, 510,300,100 ,100);
       this.insertRoomImages(this.img10, 360,203,100 ,150);
    }

    private insertRoomImages(image: HTMLImageElement, dx: number, dy: number, dw: number, dh: number){
        this.ctx.drawImage(image, dx, dy, dw, dh);
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