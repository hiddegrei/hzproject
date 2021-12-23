import PasswordMeter from './PasswordStrengthChecker.js';
export default class TimeLimit {
    passwordProperty;
    passwordStrengthProperty;
    constructor(password) {
        this.passwordProperty = password;
        this.passwordStrengthProperty = new PasswordMeter().getResult(password).score * 500;
    }
    get password() {
        return this.passwordProperty;
    }
    get timeLimit() {
        return this.passwordStrengthProperty;
    }
}
//# sourceMappingURL=TimeLimit.js.map