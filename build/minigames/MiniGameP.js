import MGMain from "./MGMain.js";
export default class MiniGameP extends MGMain {
    ctx;
    secretW = [];
    attempts;
    found;
    index;
    complete;
    attemptsArr = [];
    foundStr;
    started;
    constructor(ctx, room) {
        super(80, room);
        this.ctx = ctx;
        this.secretW = ["k", "a", "r", "e", "l", "9", "3", "2"];
        this.found = [null, null, null, null, null, null, null, null];
        this.index = 0;
        this.attempts = 5;
        this.foundStr = "";
        this.started = true;
    }
    checkKey(e) {
        if (e.keyCode === 8) {
            this.found[this.index--] = null;
        }
        else if (e.keyCode === 13) {
            this.checkAttempt();
        }
        else if (this.index <= 7) {
            for (let i = 0; i < this.found.length; i++) {
                if (this.found[i] === null) {
                    this.index = i;
                    break;
                }
            }
            console.log(this.found[this.index]);
            if (e.keyCode <= 57) {
                this.found[this.index] = String.fromCharCode(e.keyCode);
            }
            else {
                this.found[this.index] = String.fromCharCode(e.keyCode + 32);
            }
            this.index++;
        }
    }
    checkAttempt() {
        for (let i = 0; i < this.found.length; i++) {
            this.foundStr += this.found[i];
        }
        this.attemptsArr.push(this.foundStr);
        this.foundStr = "";
        let complete = true;
        if (this.attempts > 0) {
            for (let i = 0; i < this.secretW.length; i++) {
                if (this.found[i] === this.secretW[i]) {
                    this.found[i] = this.secretW[i];
                }
                else {
                    this.found[i] = null;
                    complete = false;
                }
            }
            for (let i = 0; i < this.found.length; i++) {
                if (this.found[i] === null) {
                    this.index = i;
                    break;
                }
            }
            this.attempts--;
            if (complete) {
                this.complete = true;
                setTimeout(this.answer.bind(this), 2000);
            }
        }
        else {
            this.complete = 0;
            setTimeout(this.answer.bind(this), 2000);
        }
    }
    answer() {
        this.room.miniGameFinished = true;
        this.room.answer = true;
    }
    update() {
        this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
        if (this.started) {
            document.onkeydown = this.checkKey.bind(this);
            this.started = false;
        }
    }
    render() {
        this.ctx.strokeStyle = "rgb(0,255,0)";
        this.ctx.beginPath();
        this.ctx.rect(100, 100, 600, 300);
        this.ctx.closePath();
        this.ctx.stroke();
        this.writeTextToCanvas("Je hebt 5 pogingen om het wachtwoord te raden, na elke poging kun je zien welke", 16, 110, 130);
        this.writeTextToCanvas("characters je goed hebt geraden", 16, 110, 150);
        this.writeTextToCanvas("PRESS ENTER  om je poging te testen.", 16, 110, 50);
        this.writeTextToCanvas("Je bent opgesloten door de bewakers! En de bewakers hebben een wachtwoord op de deur gezet! ", 16, 110, 70);
        this.writeTextToCanvas("Hack het wachtwoord om vrij te komen", 16, 110, 90);
        if (this.attemptsArr) {
            for (let i = 0; i < this.attemptsArr.length; i++) {
                this.writeTextToCanvas(`Poging ${i}: ${this.attemptsArr[i]}`, 19, 110, 170 + i * 20);
            }
        }
        this.ctx.beginPath();
        this.ctx.rect(700, 100, 300, 500);
        this.ctx.closePath();
        this.writeTextToCanvas("Informatie van de bewaker die het wachtwoord heeft verzonnen:", 20, 750, 100);
        this.writeTextToCanvas("voornaam: Karel", 20, 750, 130);
        this.writeTextToCanvas("achternaam: De 2e", 20, 750, 160);
        this.writeTextToCanvas("leeftijd: 32", 20, 750, 190);
        this.writeTextToCanvas("geboorte datum: 02/01/1990", 20, 750, 220);
        this.writeTextToCanvas("woonplaats: De Bank", 20, 750, 250);
        this.ctx.beginPath();
        this.ctx.rect(100, 500, 50, 50);
        this.ctx.rect(200, 500, 50, 50);
        this.ctx.rect(300, 500, 50, 50);
        this.ctx.rect(400, 500, 50, 50);
        this.ctx.rect(500, 500, 50, 50);
        this.ctx.rect(600, 500, 50, 50);
        this.ctx.rect(700, 500, 50, 50);
        this.ctx.rect(800, 500, 50, 50);
        this.ctx.closePath();
        this.ctx.stroke();
        for (let i = 1; i < 9; i++) {
            if (this.found[i - 1] != null) {
                this.writeTextToCanvas(this.found[i - 1], 40, i * 100 + 10, 540);
            }
            else {
                this.writeTextToCanvas("*", 40, i * 100 + 10, 550);
            }
        }
        if (this.complete) {
            this.writeTextToCanvas("Je hebt het wachtwoord geraden!", 30, 100, 900);
        }
        else if (this.complete === 0) {
            this.writeTextToCanvas("not good", 30, 100, 900);
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'start', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=MiniGameP.js.map