import InfoDisplay from "./InformationDisplay.js";
export default class Hints extends InfoDisplay {
    hintsArray;
    returnHint;
    hintFound;
    constructor(canvas) {
        super(canvas);
        this.hintsArray = ['R', 'e', 'g', 'e', 'n', 'b', 'o', 'o', 'g'];
        this.returnHint = [];
        console.log(this.hintsArray);
    }
    foundHint(hint) {
        this.hintFound = [];
        this.hintsArray.forEach((value) => {
            if (value === hint) {
                this.hintFound.push(value);
                this.returnHint.push(value);
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