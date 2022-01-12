export default class Progress {
    private progressProperty: number;
    private progressNumber: string;

    public constructor() {
        this.progress = 0;
        this.progressNumber = document.getElementById('progressNumber').innerText;
    }

    public get progress(): number {
        return this.progressProperty;
    }

    private set progress(progress: number) {
        this.updateProgressBar();
        this.progressProperty = progress;
    }

    public increaseProgress(dProgress: number) {
        this.progress = this.progress + dProgress;
        this.progressNumber = <string><unknown>this.progress;
        document.getElementById('progressNumber').innerText = this.progressNumber;
    }

    private updateProgressBar(): void {
        document.getElementById('progressBar').style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.progress}%, rgba(255,0,0) ${this.progress}%, rgba(255,0,0) 100%)`;
    }
}