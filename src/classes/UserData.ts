import PasswordMeter from './PasswordStrengthChecker';
import Scene from './Scene';

export default class UserData{
    private timeLimitProperty: number;

    private progressProperty: number;

    private usernameProperty: string;

    private passwordProperty: string;

    private scene: Scene;

    public constructor(scene: Scene) {
    this.progressProperty = 0;
    this.usernameProperty = localStorage.getItem('username') as string;
    this.passwordProperty = localStorage.getItem('password') as string;
    this.timeLimitProperty = new PasswordMeter().getResult(this.passwordProperty).score * 500;
    this.scene = scene;
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
        this.scene.hud.updateHUD();
    }

    public get progress(): number {
        return this.progressProperty;
    }

    public increaseProgress(dProgress: number) {
        this.progressProperty += dProgress;
    }
}