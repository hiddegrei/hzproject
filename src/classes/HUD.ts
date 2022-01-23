import Scene from "./Scene";
export enum PlayPauseButtonStates {
    Playing = 'playing',
    Paused = 'paused',
}
export interface IPPBS {
   param: PlayPauseButtonStates
}

export default class HUD {
    private state!: boolean;

    playPauseButtonState: PlayPauseButtonStates;

    private scene: Scene;

    // private htmlElementArray: [string, string, string, string][];

    public constructor(scene: Scene) {
        this.scene = scene;
        this.playPauseButtonState = PlayPauseButtonStates.Playing;
        // this.htmlElementArray = [
        //     ['class', 'id', 'style', 'content'],
        // ]
        if (document.querySelectorAll('.hud').length === 0) {
            this.isShown = false;
        } else if (document.querySelectorAll('.hud').length === 4) {
            this.isShown = true;
        } else {
            console.error(document.querySelectorAll('.hud').length)
            console.error('HUD HTML element count not equal to 0 or 4');
            console.error(document.querySelectorAll('.hud'));
            this.isShown = true;
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
        let playOrPause = () => { 
            if (this.playPauseButtonState === PlayPauseButtonStates.Playing) {
                this.playPauseButtonState = PlayPauseButtonStates.Paused;
                (document.querySelector('svg#playPauseButton.hud') as HTMLElement).innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve"><path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M45.563,30.826l-22,15C23.394,45.941,23.197,46,23,46c-0.16,0-0.321-0.038-0.467-0.116C22.205,45.711,22,45.371,22,45V15c0-0.371,0.205-0.711,0.533-0.884c0.328-0.174,0.724-0.15,1.031,0.058l22,15C45.836,29.36,46,29.669,46,30S45.836,30.64,45.563,30.826z"/></svg>`
                this.scene.game.gameLoop.pause();
            } else {
                this.playPauseButtonState = PlayPauseButtonStates.Playing;
                (document.querySelector('svg#playPauseButton.hud') as HTMLElement).innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 45.812 45.812" style="enable-background:new 0 0 45.812 45.812;"xml:space="preserve"><path d="M39.104,6.708c-8.946-8.943-23.449-8.946-32.395,0c-8.946,8.944-8.946,23.447,0,32.394c8.944,8.946,23.449,8.946,32.395,0C48.047,30.156,48.047,15.653,39.104,6.708z M20.051,31.704c0,1.459-1.183,2.64-2.641,2.64s-2.64-1.181-2.64-2.64V14.108c0-1.457,1.182-2.64,2.64-2.64s2.641,1.183,2.641,2.64V31.704z M31.041,31.704c0,1.459-1.183,2.64-2.64,2.64s-2.64-1.181-2.64-2.64V14.108c0-1.457,1.183-2.64,2.64-2.64s2.64,1.183,2.64,2.64V31.704z"/></svg>`
                this.scene.game.gameLoop.unPause();
            }
         };
        if (this.isShown) {
            //
        } else {
            document.querySelector('canvas')?.insertAdjacentHTML('beforebegin',
            `
            <div class="hud" id="timeLimit">Tijd resterend: <span></span> seconden</div>
            <div class="hud" id="score">Score: <span></span> punten</div>
            <div class="hud" id="progressBar"></div>
            <div class="hud" id="progress">Voortgang: <span></span>%</div>
            <svg class="hud" id="playPauseButton" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 45.812 45.812" style="enable-background:new 0 0 45.812 45.812;"xml:space="preserve"><path d="M39.104,6.708c-8.946-8.943-23.449-8.946-32.395,0c-8.946,8.944-8.946,23.447,0,32.394c8.944,8.946,23.449,8.946,32.395,0C48.047,30.156,48.047,15.653,39.104,6.708z M20.051,31.704c0,1.459-1.183,2.64-2.641,2.64s-2.64-1.181-2.64-2.64V14.108c0-1.457,1.182-2.64,2.64-2.64s2.641,1.183,2.641,2.64V31.704z M31.041,31.704c0,1.459-1.183,2.64-2.64,2.64s-2.64-1.181-2.64-2.64V14.108c0-1.457,1.183-2.64,2.64-2.64s2.64,1.183,2.64,2.64V31.704z"/></svg>
            `)
            document.querySelector('svg#playPauseButton.hud')?.addEventListener("click", playOrPause)
            this.isShown = true;
            this.updateHUD();
        }
    }

    public removeHUD() {
        if (this.isShown) {
            document.querySelectorAll('.hud').forEach((element) => {element.remove();});
            this.isShown = false;
        } else {
            //
        }
    }

    public toggleHUD() {
        if (this.isShown) {
            this.removeHUD();
        } else {
            this.displayHUD();
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
        // if (document.querySelectorAll('.hud').length === 4) {
        //     document.querySelectorAll('.hud').forEach((element, index, array) => { /* ... */ } )
        // } else {
        //     console.error('');
        // }
        if (this.isShown) {
            (document.querySelector('div#progressBar') as HTMLElement).style.background = `linear-gradient(90deg, rgb(0, 255, 0) 0%, rgba(0,255,0) ${this.scene.userData.progress}%, rgba(255,0,0) ${this.scene.userData.progress}%, rgba(255,0,0) 100%)`;
            (document.querySelector('div#progress span') as HTMLElement).innerText = JSON.stringify(this.scene.userData.progress);
            (document.querySelector('div#timeLimit.hud span') as HTMLElement).innerHTML = (JSON.stringify(Math.floor(this.scene.userData.timeLimit / 1000)));
            // (document.querySelector('div#score.hud span') as HTMLElement).innerHTML = JSON.stringify(this.scene.score); //TODO goede score
        }
        // console.warn(this.scene.userData.timeLimit);
        // console.warn(this.scene.userData.progress);
        // console.warn(this.scene.totalScore);
    }
}