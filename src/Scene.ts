import Game from './Game.js';
import Border from './Border.js';
import Ray from './Ray.js';
import Particle from './Particle.js';
import Level1map from './Level1map.js';
import Progression from './Progression.js';
import Score from './Score.js';

export default class Scene {
  public canvas: HTMLCanvasElement;

  public ctx: CanvasRenderingContext2D;

  public game: Game;

  public borders: Array<Border> = [];

  public particle = <any>{};

  public mouse = <any>{};

  public level:Level1map;

  static SPACE = 300;

  private score: Score[];

  private totalScore: number;

  public widthHall: number;

  private progression: Progression;

  private count: number;

  /**
   * @param canvas
   * @param game
   */
  constructor(canvas: HTMLCanvasElement, game: Game) {
    this.canvas = canvas;
    // this.canvas.width=1920;
    // this.canvas.height=969
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.game = game;
    this.ctx = this.canvas.getContext('2d');
    this.progression = new Progression(this.canvas);
    // console.log("window widht:",this.canvas.width)
    // console.log("window height:",this.canvas.height)

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
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  /**
   *
   */
  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    let trans=this.checkScaling()
    this.ctx.translate(trans.x, trans.y)

    document.onmousemove = this.mouseDown.bind(this);
    this.particle.move(this.mouse.x, this.mouse.y, this.borders);
    this.count += 1;
    
    this.progression.writeTextToCanvas('progress: ', 850, 20);
    if (this.count >= 100) {
      this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, 1050 + this.progression.getProgression(), 20);
      this.progression.setXEnd();
      if (this.count === 100) {
        this.score.forEach((element) => { this.totalScore += element.getScore(); });
      }
    } else {
      this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, 1050, 20);
    }
    this.progression.pBar(this.ctx);
    this.score[0].writeTextToCanvas(`Score: ${this.totalScore}`, 500, 20);

    //  for(let i=0;i<this.particle.rays.length;i++){
    //      this.particle.rays[i].cast(this.border)
    //  }
    // this.ray.cast(this.border)
  }

  public checkScaling(){
    let ret={x:0,y:0}
    if(window.innerWidth<=this.canvas.width&&window.innerHeight<=this.canvas.height){
      return {x:0,y:0}
    }else{

    
   let offsetX=this.canvas.width-window.innerWidth;
   let offsetY=this.canvas.height-window.innerHeight;
   if(this.particle.pos.x>window.innerWidth/2&&this.particle.pos.x<window.innerWidth/2+offsetX){
     ret.x=window.innerWidth/2+offsetX-this.particle.pos.x
   }
   if(this.particle.pos.y>window.innerHeight/2&&this.particle.pos.y<window.innerHeight/2+offsetY){
    ret.y=window.innerHeight/2+offsetY-this.particle.pos.y
  }
  return ret
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
