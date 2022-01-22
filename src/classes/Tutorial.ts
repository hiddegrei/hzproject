import Game from "./Game";

export default class Tutorial {
    public game: Game;

    public constructor(game: Game) {
        this.game = game;
    }

    public displayTutorial() {
        this.game.scene.hud.removeHUD();
        document.querySelectorAll('div.main')[0].insertAdjacentHTML('beforebegin',
        `
        <div class="tutorial" id="tutorialContainer">
        <div class="tutorial" id="tutorialContent">
        Je speelt dit spel door je muis op de plek te zetten waar je naartoe wilt lopen. 
        Je poppetje zal in een rechte lijn naar die plek gaan, maar pas wel op, 
        overal lopen agenten rond en er hangen ook nog eens camera's! En je wilt echt niet gesnapt worden, 
        want dan zul je een moeilijke puzzel moeten doen om uit de gevangenis te komen.<br>
        Uiteindelijk wil je het wachtwoord van de bank kraken, maar dat kan niet zomaar; er zijn gewoon te veel opties om het te kunnen raden!<br>
        Je zult hints moeten verzamelen. Hints vind je in de kamers, maar je raadt het al, de bank heeft de kamers met de hints goed beveiligd, dat is nou nog eens jammer.
        <button type="button" class="tutorial" id="tutorialButton">
        IK SNAP HET
        </button>
        </div>
        </div>
        `)
    }

    public removeTutorial() {
        document.querySelectorAll('.tutorial').forEach(element => {
            element.remove();
        });
        this.game.gameLoop.unPause();
        this.game.scene.hud.displayHUD();
    }
}