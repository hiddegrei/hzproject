import InfoDisplay from "./InformationDisplay.js";
import Scene from "./Scene.js";
export default class Hints extends InfoDisplay {
    hintsArray;
    returnHint;
    hintFound;
    progress;
    constructor(canvas) {
        super(canvas);
        this.hintsArray = ['R', 'e', 'g', 'e', 'n', 'b', 'o', 'o', 'g', '!'];
        this.returnHint = [];
        console.log(this.hintsArray);
        this.progress = Scene.getProgress();
    }
    foundHint(hint) {
        this.hintFound = [];
        this.hintsArray.forEach((value) => {
            if (value === hint) {
                this.hintFound.push(value);
                this.returnHint.push(value);
                this.progress.increaseProgress(10);
            }
        });
        return this.hintFound;
    }
    getHint() {
        return this.returnHint;
    }
    getAnswer() {
        return this.hintsArray;
    }
}
//# sourceMappingURL=Hints.js.map