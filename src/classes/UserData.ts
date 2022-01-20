import TimeLimit from "./TimeLimit";
import Progress from "./Progress.js";

export default class UserData{
    private timeLimitProperty: TimeLimit;

    private progressProperty: Progress;

    private usernameProperty: string;

    private passwordProperty: string;

    public constructor() {
    // public constructor(username: string, password: string) {
    this.timeLimitProperty = new TimeLimit(this.password);
    this.progressProperty = new Progress();
    this.usernameProperty = localStorage.getItem('username') as string;
    this.passwordProperty = localStorage.getItem('password') as string;
    }

    public get username(): string {
        return this.usernameProperty;
    }

    public get password(): string {
        return this.passwordProperty;
    }

    public get timeLimit(): number {
        return this.timeLimitProperty.timeLimit;
    }

    public get progress(): number {
        return this.progressProperty.progress;
    }

    public increaseProgress(dProgress: number) {
        this.progressProperty.increaseProgress(dProgress);
    }
}