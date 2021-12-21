import InfoDisplay from './InformationDisplay.js';
export default class Score extends InfoDisplay {
    score;
    constructor(score, canvas) {
        super(canvas);
        this.score = score;
    }
    setScore(scoreChange) {
        this.score += scoreChange;
    }
    getScore() {
        return this.score;
    }
}
//# sourceMappingURL=Score.js.map