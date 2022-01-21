import Scene from "./Scene";

export default class HUD {
    private state!: boolean;

    private scene: Scene;

    // private htmlElementArray: [string, string, string, string][];

    public constructor(scene: Scene) {
        this.scene = scene;
        // this.htmlElementArray = [
        //     ['class', 'id', 'style', 'content'],
        // ]
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

    public get isShown() {
        return this.state;
    }

    private set isShown(state: boolean) {
        this.state = state;
    }

    public displayHUD() {
        if (this.isShown) {
            //
        } else {
            document.querySelector('canvas')?.insertAdjacentHTML('beforebegin',
            `
            <div class="hud" id="timeLimit">Tijd resterend: <span></span> seconden</div>
            <div class="hud" id="score">Score: <span></span> punten</div>
            <div class="hud" id="progressBar"></div>
            <div class="hud" id="progress">Voortgang: <span></span>%</div>
            `)
            this.isShown = true;
        }
        this.updateHUD();
    }

    public removeHUD() {
        if (this.isShown) {
            document.querySelectorAll('div.hud').forEach((element) => {element.remove();});
            this.isShown = false;
        } else {
            //
        }
    }

    public toggleHUD() {
        if (this.isShown) {
            this.displayHUD();
        } else {
            this.removeHUD();
        }
        this.isShown = !this.isShown;
    }

    public updateHUD() {
        // if (document.querySelectorAll('#progressBar').length === 1) {
        //     document.querySelectorAll as('#progressBar')[0].style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.scene.userData.progress}%, rgba(255,0,0) ${this.scene.userData.progress}%, rgba(255,0,0) 100%)`;
        // } else {
        //     console.error();
        // }
        // document.querySelectorAll('#progressBar').forEach((element, index, array) => { 
        //     if (array.length !== 1) {
        //         console.error('');
        //     }
        //     element.style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.scene.userData.progress}%, rgba(255,0,0) ${this.scene.userData.progress}%, rgba(255,0,0) 100%)`;
        // } )
        // document.querySelectorAll('#progressBar')[0].style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.scene.userData.progress}%, rgba(255,0,0) ${this.scene.userData.progress}%, rgba(255,0,0) 100%)`;
        // document.querySelectorAll('#progress span')[0].innerText = JSON.stringify(this.scene.userData.progress);
        // document.querySelectorAll('div#timeLimit.hud span')[0].innerHTML = (JSON.stringify(Math.floor(this.scene.userData.timeLimit / 1000)));
        // document.querySelectorAll('div#score.hud span')[0].innerHTML = JSON.stringify(this.scene.score); //TODO goede score
        if (this.isShown) {
            (document.querySelector('#progressBar') as HTMLElement).style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.scene.userData.progress}%, rgba(255,0,0) ${this.scene.userData.progress}%, rgba(255,0,0) 100%)`;    
            (document.querySelector('#progress span') as HTMLElement).innerText = JSON.stringify(this.scene.userData.progress);
            (document.querySelector('div#timeLimit.hud span') as HTMLElement).innerHTML = (JSON.stringify(Math.floor(this.scene.userData.timeLimit / 1000)));
            // (document.querySelector('div#score.hud span') as HTMLElement).innerHTML = JSON.stringify(this.scene.score); //TODO goede score
        }   
        // console.warn(this.scene.userData.timeLimit);
        // console.warn(this.scene.userData.progress);
        // console.warn(this.scene.totalScore);
    }
}