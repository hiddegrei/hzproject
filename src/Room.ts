import KeyboardListener from "./KeyboardListener.js";
import MiniGame from "./MiniGame.js";
import Scene from "./Scene.js";

export default class Room{
    public roomId:number
    public ctx:CanvasRenderingContext2D;
    private keyboard:KeyboardListener;
    private scene:Scene;
   
    constructor(roomId:number,ctx:CanvasRenderingContext2D,scene:Scene){
        this.roomId=roomId
        this.ctx=ctx
        this.keyboard=new KeyboardListener()
        this.scene=scene
        

    }

   
}