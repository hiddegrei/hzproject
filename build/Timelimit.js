export default class TimeLimit {
    passwordProperty;
    timeLimitProperty;
    constructor(password) {
        this.passwordProperty = password;
    }
    get timeLimit() {
        return 10 * this.calculatePasswordStrength();
    }
    set timeLimit(timeLimit) {
        this.timeLimitProperty = timeLimit;
    }
    calculatePasswordStrength() {
        return this.passwordProperty.length;
    }
}
//# sourceMappingURL=TimeLimit.js.map