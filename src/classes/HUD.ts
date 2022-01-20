export default class HUD {
    private isShown: boolean;

    public constructor() {
        if (document.querySelectorAll('.hud').length === 0) {
            this.isShown = false;
        } else if (document.querySelectorAll('.hud').length === 4) {
            this.isShown = true;
        } else {
            this.isShown = false;
            console.error('HUD HTML element count not equal to 0 or 4');
            console.error(document.querySelectorAll('.hud'));
            this.removeHUD();
        }
    }

    public get state() {
        return this.isShown;
    }

    public displayHUD() {
        if (this.isShown) {
            //
        } else {
            this.isShown = true;
            document.querySelector('canvas')?.insertAdjacentHTML('beforebegin',
            `
            <div class="hud" id="timeLimit">Tijd resterend: <span></span> seconden</div>
            <div class="hud" id="score">Score: <span></span> punten</div>
            <div class="hud" id="progressBar"></div>
            <div class="hud" id="progress">Voortgang: <span></span>%</div>
            `)
        }
        this.updateHUD();
    }

    public removeHUD() {
        if (this.isShown) {
            //
        } else {
            this.isShown = false;
            document.querySelectorAll('div.hud').forEach((element) => {element.remove();});
        }
    }

    public toggleHUD() {
        this.isShown = !this.isShown;
        if (this.isShown) {
            this.displayHUD();
        } else {
            this.removeHUD();
        }
    }

    public updateHUD() {
        // document.querySelector<HTMLElement>('#progressBar').style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.progress}%, rgba(255,0,0) ${this.progress}%, rgba(255,0,0) 100%)`;    
        // document.querySelector<HTMLElement>('#progress span').innerText = JSON.stringify(this.progress);
        // document.querySelector('div#timeLimit.hud span').innerHTML = (JSON.stringify(Math.floor(this.timeLeft / 1000)));
        // document.querySelector('div#score.hud span').innerHTML = JSON.stringify(this.totalScore); //TODO goede score
        // document.querySelector<HTMLElement>('#progressBar').style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.progress}%, rgba(255,0,0) ${this.progress}%, rgba(255,0,0) 100%)`;    
        // document.querySelector<HTMLElement>('#progress span').innerText = JSON.stringify(this.progress);
        // document.querySelector('div#timeLimit.hud span').innerHTML = (JSON.stringify(Math.floor(this.timeLeft / 1000)));
        // document.querySelector('div#score.hud span').innerHTML = JSON.stringify(this.totalScore); //TODO goede score
        // console.warn(this.timeLimit);
        // console.warn(this.progress);
        // console.warn(this.score);
    }
}