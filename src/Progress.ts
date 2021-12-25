export default class Progress {
    private progressProperty: number;

    public constructor() {
        this.progress = 0;
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
    }

    public updateProgressBar(): void {
        document.getElementById('progressBar').style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.progress}%, rgba(255,0,0) ${this.progress}%, rgba(255,0,0) 100%)`;
    }
}