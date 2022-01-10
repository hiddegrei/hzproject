import KeyboardListener from "./KeyboardListener.js";
import Scene from "./Scene.js";

export default class Room{
    public visitedRooms:Array<boolean>=[];
    public roomId:number
    public ctx:CanvasRenderingContext2D;
    private keyboard:KeyboardListener;
    private scene:Scene;

    constructor(roomId:number,ctx:CanvasRenderingContext2D,scene:Scene){
        // super(roomId,ctx,scene)
        this.roomId=roomId
        this.ctx=ctx
        this.keyboard=new KeyboardListener()
        this.scene=scene
        for(let i=0;i<16;i++){
            this.visitedRooms[i]=false
        }
        
    }

    public update(){
        if(this.keyboard.isKeyDown(32)){
          this.scene.insideRoom=false
          this.visitsNew(this.roomId)
        }

    }

    public render(){
        this.writeTextToCanvas(`room: ${this.roomId}`,20,100,100)
        this.writeTextToCanvas("press spacebar to leave room",20,300,300)

    }

    public setRoomId(roomId:number){
        this.roomId=roomId
        

    }

    public visitsNew(roomId:number){
      
        this.visitedRooms[roomId]=true
        console.log(roomId,this.visitedRooms[roomId])
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