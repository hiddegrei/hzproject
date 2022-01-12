export default class Progress {
    progressProperty;
    progressNumber;
    constructor() {
        this.progress = 0;
        this.progressNumber = document.getElementById('progressNumber').innerText;
    }
    get progress() {
        return this.progressProperty;
    }
    set progress(progress) {
        this.updateProgressBar();
        this.progressProperty = progress;
    }
    increaseProgress(dProgress) {
        this.progress = this.progress + dProgress;
        this.progressNumber = this.progress;
        document.getElementById('progressNumber').innerText = this.progressNumber;
    }
    updateProgressBar() {
        document.getElementById('progressBar').style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.progress}%, rgba(255,0,0) ${this.progress}%, rgba(255,0,0) 100%)`;
    }
}
//# sourceMappingURL=Progress.js.map