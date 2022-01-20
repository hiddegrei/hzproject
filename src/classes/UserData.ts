import PasswordMeter from './PasswordStrengthChecker';

export default class UserData{
    private timeLimitProperty: number;

    private progressProperty: number;

    private usernameProperty: string;

    private passwordProperty: string;

    public constructor() {
    // public constructor(username: string, password: string) {
    this.progressProperty = 0
    // this.progressProperty = new Progress();
    this.usernameProperty = localStorage.getItem('username') as string;
    this.passwordProperty = localStorage.getItem('password') as string;
    this.timeLimitProperty = new PasswordMeter().getResult(this.passwordProperty).score * 500;
    }

    public get username(): string {
        return this.usernameProperty;
    }

    public get password(): string {
        return this.passwordProperty;
    }

    public get timeLimit(): number {
        return this.timeLimitProperty;
    }

    public decreaseTimeLimit(miliseconds: number) {
        this.timeLimitProperty -= miliseconds;
    }

    public get progress(): number {
        return 0;
        // return this.progressProperty.progress;
    }

    public increaseProgress(dProgress: number) {
        // this.progressProperty.increaseProgress(dProgress);
    }
}