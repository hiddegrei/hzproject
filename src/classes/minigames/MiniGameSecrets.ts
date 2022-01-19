import Room from "../Room"

export default class MiniGameSecrets{

    private secrets:string[][]
    private secretsSeen:boolean[]=[]

    constructor(){
       
       
       
        //this.loadSecrets()
        this.secrets=[["1","7","1","s","m","i","t","h","Rik","Smith","17","17/10/2001","Utrecht","Voetbal"],
        ["3","4","2","4","m","e","s","s","i","Lionel","Messi","34","24/06/1987","Parijs","Voetbal"],
        ["b","a","s","b","a","l","8","3","Bastiaan","Berg","18","08/08/2003","Utrecht","Basketballen"],
        ["j","a","n","w","i","e","l","1","Jan","Raas","69","08/11/1952","Madrid","Wielrennen"],
        ["s","l","o","g","a","n","8","8","9","Peter","Sagan","34","08/09/1988","Slovakije","Wielrennen"],
        ["1","8","3","m","i","g","a","8","Tigo","Miggon","18","18/03/2003","Malta","Tennis"],
        ["0","9","2","3","d","a","v","i","david","David","Hill","09/23/1975","Rome","Koken"],
        ["1","2","0","2","2","j","a","n","Jan","Alleman","20","12/12/2002","Amsterdam","boeken"],
        ["k","a","r","e","l","9","3","2","Karel","De 2e","32","02/01/1990","De Bank","Bewaken"],
        ["9","4","p","e","r","e","n","8","Peter","Peren","28","28/02/1994","De Bank","Bewaken"],
        ["h","a","m","4","5","k","a","a","s","Klaas","Kaas","54","04/05/1974","Hamburg","Vissen"]
    ]

    }
   

    

    public getSecret(){
        
        let ranNum:number=0
        let gotit=false
        let returnSecret:string[]=[]
        
        
       while(!gotit){
        ranNum=Room.randomNumber(0,this.secrets.length-7)
            if(!this.secretsSeen[ranNum]){
                
                returnSecret=this.secrets[ranNum];
                this.secretsSeen[ranNum]=true
                gotit=true
            }

        }
        let found:any[]=[]
       
           
            for(let i=0;i<(this.secrets[ranNum].length-6);i++){
                if (this.secrets[ranNum][i] === '-') {
                    found.push('-');
                } else {
                    found.push(null);
                }
                
            }
        return [returnSecret,found];



    }

   
}