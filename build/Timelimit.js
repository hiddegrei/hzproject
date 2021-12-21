import PasswordMeter from './PasswordStrengthChecker.js';
export default class TimeLimit {
    passwordProperty;
    passwordStrengthProperty;
    constructor(password) {
        this.passwordProperty = password;
        this.passwordStrengthProperty = new PasswordMeter().getResult(password).score;
    }
    get password() {
        return this.passwordProperty;
    }
    get timeLimit() {
        return 5 * this.passwordStrengthProperty;
    }
}
//# sourceMappingURL=TimeLimit.js.map