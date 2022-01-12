import InfoDisplay from "./InformationDisplay.js";
import Progress from "./Progress.js";
import Scene from "./Scene.js";

export default class Hints extends InfoDisplay{
    private hintsArray: string[];
    private returnHint: string[];
    private hintFound: string[];
    private progress: Progress;

    public constructor(canvas: HTMLCanvasElement){
        super(canvas);
        this.hintsArray = ['R','e','g','e','n','b','o','o','g','!'];
        this.returnHint = [];
        console.log(this.hintsArray);
        this.progress = Scene.getProgress()
    }

    public foundHint(hint: string) {
        this.hintFound = [];
        this.hintsArray.forEach((value: string) => {
            if (value === hint) {
                this.hintFound.push(value);
                this.returnHint.push(value);
                this.progress.increaseProgress(10);
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