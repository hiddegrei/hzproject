export default class Keys{

    public keys:Array<boolean>=[]

    public inPossesion:Array<boolean>=[]

    constructor(){
        for(let i=0;i<15;i++){
            this.keys[i]=false
            this.inPossesion[i]=false;
        }

    }
}