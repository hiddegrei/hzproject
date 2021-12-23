import Game from './Game.js';
import Border from './Border.js';
import Ray from './Ray.js';
import Particle from './Particle.js';
import Level1map from './Level1map.js';
import Progression from './Progression.js';
import Score from './Score.js';
import EndGame from './EndGame.js';
import Vector from './Vector.js';
import KeyboardListener from './KeyboardListener.js';
import Camera from './Camera.js';
import TimeLimit from './TimeLimit.js';


export default class Scene {
  public canvas: HTMLCanvasElement;

  public ctx: CanvasRenderingContext2D;

  public game: Game;

  public borders: Array<Border> = [];

  public particle = <any>{};

  public mouse = <any>{};

  public level: Level1map;

  static SPACE = 300;

  private score: Score[];

  private totalScore: number;

  public widthHall: number;

  private progression: Progression;

  private count: number;

  private endGame: EndGame;

  private condition: number;

  public currentTrans: Vector;

 

  private keyboard:KeyboardListener;

  private camera:Camera;

  private username:string;
  private password:string;
  private timeLimit: TimeLimit;
  private time:number;
  private timeLeft:number

  /**
   * @param canvas
   * @param game
   */
  constructor(canvas: HTMLCanvasElement, game: Game) {
    this.canvas = canvas;
    this.canvas.width = 1920;
    this.canvas.height = 969;
    this.camera=new Camera()
    this.currentTrans = new Vector(0, 0)
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    this.keyboard=new KeyboardListener()

    

    this.game = game;
    this.ctx = this.canvas.getContext('2d');
    this.progression = new Progression(this.canvas);
    console.log("window widht:", window.innerWidth)
    console.log("window height:", window.innerHeight)

    this.score = [];
    this.score.push(new Score(0, this.canvas));
    this.totalScore = 0;
    this.borders = [];
    this.level = new Level1map(this.canvas, this.ctx);

    for (let i = 0; i < this.level.level1.length; i++) {
      const x = this.level.level1[i][0];
      const y = this.level.level1[i][1];
      const x2 = this.level.level1[i][2];
      const y2 = this.level.level1[i][3];
      this.borders.push(new Border(x, y, x2, y2, this.ctx));
    }
    // this.border= new Border(300,50,300,200,this.ctx)
    // this.ray=new Ray(50,150, this.ctx)
    this.particle = new Particle(100, 100+0.5*this.level.widthHall, this.ctx);
    this.mouse = { x: 0, y: 0 };

    // window.addEventListener("mousemove",this.mouseDown.bind(this), false)
    this.count = 0;

    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');

    this.timeLimit = new TimeLimit(this.password);
    this.timeLeft=this.timeLimit.timeLimit

    this.time=0

    console.log(this.username)
  }

  

  /**
   *
   */
  processInput() {

  }

  /**
   * @param e
   */
  mouseDown(e: MouseEvent) {
    // this.particle.update(window.event.clientX,window.event.clientY)
    this.mouse = this.camera.toWorld(e.clientX, e.clientY)
    //console.log(this.mouse)


  }


  

  /**
   *@param condition boolean
   */
  update(elapsed:number): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.progression.writeTextToCanvas('progress: ', this.canvas.width / 10 * 6.5, 20);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    let trans = this.camera.checkScaling(this.canvas,this.particle)
    this.camera.createMatrix(trans.x, trans.y, 0, 0)

    // this.currentTrans = { x: trans.x, y: trans.y }
    this.ctx.translate(trans.x, trans.y)
    // this.ctx.translate(100,100)
    this.progression.writeTextToCanvas('progress: ', this.canvas.width / 10 * 6.5, 20);

    document.onmousemove = this.mouseDown.bind(this);
    this.particle.move(this.mouse.x, this.mouse.y, this.borders);
    this.count += 1;

    if (this.count >= 100) {
      this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, this.canvas.width / 10 * 9, 20);
      this.progression.setXEnd();
      if (this.count === 100) {
        this.score.forEach((element) => { this.totalScore += element.getScore(); });
      }
      if (this.count >= 500) {
        
      }
    } else {
      this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, this.canvas.width / 10 * 9, 20);
    }
    this.progression.pBar(this.ctx);
    this.score[0].writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 20);

    if (this.keyboard.isKeyDown(82)) {
      // this.endGame = new EndGame(this.canvas);
      this.game.isEnd = true;
    }

    //  for(let i=0;i<this.particle.rays.length;i++){
    //      this.particle.rays[i].cast(this.border)
    //  }
    // this.ray.cast(this.border)
    document.onmousemove = this.mouseDown.bind(this);
    this.particle.move(this.mouse.x, this.mouse.y, this.borders);
    this.count += 1;

    if (this.time > 1000) {
      this.timeLeft-=1

      this.time = 0
    } else {
      this.time += elapsed
    }
    
   
  }

  

  

  

  /**
   *
   */
  render() {
    // this.border.show()
    this.particle.show();
    // this.writeTextToCanvas("hi",100,100)
    for (let i = 0; i < this.borders.length; i++) {
      this.borders[i].show();
    }
    this.particle.look(this.borders);

    this.writeTextToCanvas('Central hub', 20, this.canvas.width / 2, 400);

    this.writeTextToCanvas("Timelimit: "+this.timeLeft,20,100,20)

    
  }

  /**
   * @param text
   * @param xCoordinate
   * @param yCoordinate
   * @param fontSize
   * @param color
   * @param alignment
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'center',
    color: string = 'red',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
// # sourceMappingURL=Scene.js.map
// # sourceMappingURL=Scene.js.map
