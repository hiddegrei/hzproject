// import EndGame from './EndGame.js';
// import GameLoop from './GameLoop.js';

// import Scene from './Scene.js';

// import TimeLimit from './TimeLimit.js';

// export default class Game {
//   public canvas: HTMLCanvasElement;

//   public gameLoop: GameLoop;

//   public scene: Scene;

//   private endGame:EndGame;

//   public isEnd:boolean;

//   private username: string;

//   private password: string;

//   private timeLimit: TimeLimit;

//   /**
//    * @param canvas
//    */
//   constructor(canvas: HTMLElement) {
//     this.canvas = canvas as HTMLCanvasElement;
//     this.scene = new Scene(this.canvas, this);
//     this.gameLoop = new GameLoop(this);
//     this.endGame=new EndGame(this.canvas)
//     this.username = new URLSearchParams(document.location.search).get('username');
//     this.password = new URLSearchParams(document.location.search).get('password');
//     this.timeLimit = new TimeLimit(this.password);
//   }

//   /**
//    *
//    */
//   public start() {
//     console.log('starting');
//     console.log(`Time limit: ${this.timeLimit.timeLimit}`);
//     this.gameLoop.start();
//   }

//   /**
//    *
//    */
//   public processInput() {
//     this.scene.processInput();
//   }

//   /**
//    * @param elapsed
//    */
//   public update(elapsed: number) {
//     if (this.isEnd) {
//       this.endGame.update();
//     } else {
//       this.scene.update();
//     }
//     // this.scene.update()

//     return false;
//   }

//   /**
//    *
//    */
//   public render() {
//     if (this.isEnd) {
//       this.endGame.render();
//     } else {
//       this.scene.render();
//     }
//     // this.scene.render();
//   }

//   /**
//    * @param source
//    */
//   static loadNewImage(source: string) {
//     const img = new Image();
//     img.src = source;
//     return img;
//   }

//   /**
//    * @param min
//    * @param max
//    */
//   static randomNumber(min: number, max: number) {
//     return Math.round(Math.random() * (max - min) + min);
//   }
// }
// // # sourceMappingURL=Game.js.map
