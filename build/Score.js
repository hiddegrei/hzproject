export default class Score {
    scoreProperty;
    constructor(score) {
        this.scoreProperty = score;
    }
    set score(dScore) {
        this.scoreProperty += dScore;
    }
    get score() {
        return this.score;
    }
}
//# sourceMappingURL=Score.js.map