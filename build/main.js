import Game from './Game.js';
console.log('Javascript is working!');
function init() {
    const game = new Game(document.getElementById('canvas'));
    game.start();
}
window.addEventListener('load', init);
//# sourceMappingURL=main.js.map