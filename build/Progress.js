export default class Progress {
    progressProperty;
    constructor() {
        this.progress = 0;
    }
    get progress() {
        return this.progressProperty;
    }
    set progress(progress) {
        this.updateProgressBar();
        this.progressProperty = progress;
    }
    updateProgressBar() {
        document.getElementById('progressBar').style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.progress}%, rgba(255,0,0) ${this.progress}%, rgba(255,0,0) 100%)`;
    }
}
//# sourceMappingURL=Progress.js.map