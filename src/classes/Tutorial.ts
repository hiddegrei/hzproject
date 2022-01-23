import Game from "./Game";

export default class Tutorial {
    public game: Game;

    public constructor(game: Game) {
        this.game = game;
        if (localStorage.getItem('tutorial') === null) {
            localStorage.setItem('tutorial', '0')
        }
    }

    public displayTutorial() {
        this.game.scene.hud.removeHUD();
        document.querySelector('div.main')?.insertAdjacentHTML('beforebegin',
        `
        <div class="tutorial" id="tutorialContainer">
        <div class="tutorial" id="tutorialContent">
        Je speelt dit spel door je muis op de plek te zetten waar je naartoe wilt gaan. 
        Je poppetje zal in een rechte lijn naar die plek lopen, maar pas wel op, 
        overal lopen agenten rond en er hangen ook nog eens camera's! Je wilt echt niet gesnapt worden, 
        want dan zul je een moeilijke puzzel moeten doen om uit de gevangenis te komen.<br>
        <br>
        Uiteindelijk wil je het wachtwoord van de bank kraken, 
        maar dat kan niet zomaar; er zijn gewoon te veel opties om het te kunnen raden!<br>
        Je zult hints moeten verzamelen. Hints vind je in de kamers, maar je raadt het al, 
        de bank heeft de kamers met de hints goed beveiligd, 
        dat is nou nog eens jammer.<br>
        Om in een kamer te kunnen gaan moet je een sleutel stelen van een agent. 
        Dit doet je door naar de agent toe te lopen en 'm te hacken. Blijf in de buurt, maar pas op dat je niet gepakt wordt!<br>
        Je kunt nu naar een rode stip lopen met een nummer erboven om een minigame te spelen.<br>
        Bovenaan in scherm zie je welke hints je hebt. 
        Wanneer je denkt dat je er genoeg hebt kun proberen naar de centrale bank in het midden te gaan om een poging te doen het wachtwoord te kraken! 
        Hoe sneller je bent, hoe meer punten je krijgt; ga voor een zo hoog mogelijke score!<br>
        Mischien lukt het je zelfs wel de highscore van je klasgenoot de verbreken!

        <button type="button" class="tutorial" id="tutorialButton">
        IK SNAP HET
        </button>
        </div>
        </div>
        `)
        localStorage.setItem('tutorial', JSON.stringify(parseInt(localStorage.getItem('tutorial')!) + 1));
    }

    public removeTutorial() {
        document.querySelectorAll('.tutorial').forEach(element => {
            element.remove();
        });
        this.game.gameLoop.unPause();
        this.game.scene.hud.displayHUD();
    }
}