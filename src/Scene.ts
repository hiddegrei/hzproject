import Game from './Game.js';
import Border from './Border.js';
import Ray from './Ray.js';
import Particle from './Particle.js';
import Level1map from './Level1map.js';
import Progression from './Progression.js';
import Score from './Score.js';
import EndGame from './EndGame.js';
import Vector from './Vector.js';

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

  public matrix: Array<number> = []
  public invMatrix: Array<number> = []

  /**
   * @param canvas
   * @param game
   */
  constructor(canvas: HTMLCanvasElement, game: Game) {
    this.canvas = canvas;
    this.canvas.width = 1920;
    this.canvas.height = 969;
    this.currentTrans = new Vector(0, 0)
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;

    this.matrix = [1, 0, 0, 1, 0, 0];
    this.invMatrix = [1, 0, 0, 1];

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
    this.particle = new Particle(100, 100, this.ctx);
    this.mouse = { x: 0, y: 0 };

    // window.addEventListener("mousemove",this.mouseDown.bind(this), false)
    this.count = 0;
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
    this.mouse = this.toWorld(e.clientX, e.clientY)
    //console.log(this.mouse)


  }


  

  /**
   *@param condition boolean
   */
  update(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.progression.writeTextToCanvas('progress: ', this.canvas.width / 10 * 6.5, 20);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    let trans = this.checkScaling()
    this.createMatrix(trans.x, trans.y, 0, 0)

    // this.currentTrans = { x: trans.x, y: trans.y }
    this.ctx.translate(trans.x, trans.y)
    // this.ctx.translate(100,100)
    this.progression.writeTextToCanvas('progress: ', this.canvas.width / 10 * 6.5, 20);

    document.onmousemove = this.mouseDown.bind(this);
    this.particle.move(this.mouse.x, this.mouse.y, this.borders);
    this.count += 1;

    this.progression.writeTextToCanvas('progress: ', 850, 20);
    // this.progression.writeTextToCanvas('progress: ', 850, 20);
    if (this.count >= 100) {
      this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, this.canvas.width / 10 * 9, 20);
      this.progression.setXEnd();
      if (this.count === 100) {
        this.score.forEach((element) => { this.totalScore += element.getScore(); });
      }
    } else {
      this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, this.canvas.width / 10 * 9, 20);
    }
    this.progression.pBar(this.ctx);
    this.score[0].writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 20);

    //  for(let i=0;i<this.particle.rays.length;i++){
    //      this.particle.rays[i].cast(this.border)
    //  }
    // this.ray.cast(this.border)
    document.onmousemove = this.mouseDown.bind(this);
    this.particle.move(this.mouse.x, this.mouse.y, this.borders);
    this.count += 1;
  }

  public checkScaling() {
    let ret = { x: 0, y: 0 }
    if (window.innerWidth >= this.canvas.width && window.innerHeight >= this.canvas.height) {
      return { x: 0, y: 0 }
    } else {


      let offsetX = this.canvas.width - window.innerWidth;
      let offsetY = this.canvas.height - window.innerHeight;
      if (this.particle.pos.x > window.innerWidth / 2 && this.particle.pos.x < window.innerWidth / 2 + offsetX) {
        ret.x = -(offsetX - (window.innerWidth / 2 + offsetX - this.particle.pos.x))
      }
      if (this.particle.pos.x > window.innerWidth / 2 + offsetX) {
        ret.x = -(offsetX)
      }
      if (this.particle.pos.y > window.innerHeight / 2 && this.particle.pos.y < window.innerHeight / 2 + offsetY) {
        ret.y = -(offsetY - (window.innerHeight / 2 + offsetY - this.particle.pos.y))
      }
      if (this.particle.pos.y > window.innerHeight / 2 + offsetY) {
        ret.y = -(offsetY)
      }
      return ret
    }

  }

  createMatrix(x: number, y: number, scale: number, rotate: number) {
    // var m = this.matrix; // just to make it easier to type and read
    // var im = this.invMatrix; // just to make it easier to type and read

    // create the rotation and scale parts of the matrix
    this.matrix[3] = this.matrix[0] = Math.cos(rotate) * scale;
    this.matrix[2] = -(this.matrix[1] = Math.sin(rotate) * scale);

    // add the translation
    this.matrix[4] = x;
    this.matrix[5] = y;


    // calculate the inverse transformation

    // first get the cross product of x axis and y axis
    let cross = this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2];

    // now get the inverted axis
    if (cross != 0) {
      this.invMatrix[0] = this.matrix[3] / cross;
      this.invMatrix[1] = -this.matrix[1] / cross;
      this.invMatrix[2] = -this.matrix[2] / cross;
      this.invMatrix[3] = this.matrix[0] / cross;
    } else {
      this.invMatrix = [1, 0, 0, 1]
    }
  }

  toWorld(x: number, y: number) {

    var xx, yy, m, result;
    m = this.invMatrix;
    xx = x - this.matrix[4];     // remove the translation 
    yy = y - this.matrix[5];     // by subtracting the origin
    // return the point {x:?,y:?} by multiplying xx,yy by the inverse matrix
    return {
      x: xx * this.invMatrix[0] + yy * this.invMatrix[2],
      y: xx * this.invMatrix[1] + yy * this.invMatrix[3]
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
