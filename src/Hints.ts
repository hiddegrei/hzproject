import InfoDisplay from "./InformationDisplay.js";

export default class Hints extends InfoDisplay{
    private hintsArray: string[];
    private returnHint: string[];
    private hintFound: string[];

    public constructor(canvas: HTMLCanvasElement){
        super(canvas);
        this.hintsArray = ['R','e','g','e','n','b','o','o','g'];
        this.returnHint = [];
        console.log(this.hintsArray);
    }

    public foundHint(hint: string) {
        this.hintFound = [];
        this.hintsArray.forEach((value: string) => {
            if (value === hint) {
                this.hintFound.push(value);
                this.returnHint.push(value);
            }
        });
        return this.hintFound;
    }

    public getHint(){
        return this.returnHint;
    }

    public getAnswer() {
        return this.hintsArray;
    }
}