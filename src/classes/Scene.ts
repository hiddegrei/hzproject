import Game from "./Game";
import UserData from "./UserData";
import Border from "./Border";
import Particle from "./Particle";
import Level1map from "./Level1map";
import Score from "./Score";
import Vector from "./Vector";
import KeyboardListener from "./KeyboardListener";
import Camera from "./Camera";
import Agent from "./Agent";
import Room from "./Room";
import Keys from "./Keys";
import Hints from "./Hints";
import SceneInfo from "./SceneInfo";
import CameraAgent from "./CameraAgent";
import DarkSpot from "./DarkSpot";
import HUD from "./HUD";
import PlaySound from "./PlaySound";
import SpawnCookie from "./SpawnCookie";

export default class Scene {
  public userData: UserData;

  public hud: HUD;

  public playSound: PlaySound;

  public canvas: HTMLCanvasElement;

  public static readonly POINTS_WIN_MG = 100;
  public static readonly POINTS_LOSS_MG = 25;
  public static readonly CAUGHT_AGENTS = 300;
  public static readonly WIN_BOSSLEVEL = 500;

  private countCameraTime: number;

  public ctx: CanvasRenderingContext2D;

  private sceneInfo: SceneInfo;

  public game: Game;

  public borders: Array<Border> = [];

  public particle: any;

  public mouse: any;

  public level: Level1map;

  public cameraAgents: CameraAgent[] = [];

  static SPACE = 300;

  public score: Score;

  public totalScore: number;

  public widthHall!: number;

  public currentTrans: Vector;

  private room: Room;

  private keyboard: KeyboardListener;

  public camera: Camera;

  private agents: Array<Agent> = [];

  private time: number;

  private roomsIds: Array<any> = [];

  public insideRoom: boolean;

  private inRoomNum: number;

  public keys: Keys;

  public timeHacking: number;

  public lockedUp: number;

  private hints: Hints;

  public howGameEnded!: string;

  private imgBank: HTMLImageElement;

  private keyDown!: number;

  private playerRadius: number;

  private timeTurnAroundAgents: number;

  private testImg: HTMLImageElement;

  private flash: number;

  private imgFloor: HTMLImageElement;
  private trans: any = [];

  private elapsed: number;

  private count: number;

  private autoSearch: boolean;

  private darkSpots: DarkSpot;

  private cameraLive: boolean

  private spawnCookie:SpawnCookie;

  private cookieTime:number;

  private showAgentAlert:boolean;

  private seenCamera: boolean;
  private seenCameraTime: number

  // private agentMid:Agent

  /**
   * @param canvas
   * @param game
   */
  constructor(canvas: HTMLCanvasElement, game: Game, time: number) {
    this.game = game;
    this.userData = new UserData(this);
    this.score = new Score(0);
    this.hud = new HUD(this);
    this.hud.displayHUD();
    this.totalScore = 0;
    this.playSound = new PlaySound();
    this.canvas = canvas;
    this.cookieTime=0
    this.seenCamera=true
    this.seenCameraTime=0
    this.showAgentAlert=false
    this.canvas.width = 1920;
    this.testImg = Game.loadNewImage("./img/objects/gold_trophytest.png");
    this.canvas.height =920 ;
    this.playerRadius = 200;
    this.timeTurnAroundAgents = 0;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.camera = new Camera();
    this.lockedUp = 0;
    this.currentTrans = new Vector(0, 0);
    this.sceneInfo = new SceneInfo(this.canvas, this.ctx);
    // this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.keyboard = new KeyboardListener();
    this.insideRoom = false;
    this.inRoomNum = -1;
    this.keys = new Keys(this.ctx);
    this.timeHacking = 0;
    this.flash = 1;
    this.elapsed = 0;
    this.count = 0;
    this.autoSearch = false;
    this.countCameraTime = 0;
    this.cameraLive = true;

    this.imgBank = Game.loadNewImage("./img/background/bankheistmap.jpg");
    this.imgFloor = Game.loadNewImage("./img/background/backgroundGamehz.png");

    document.onkeydown = this.checkKeyScene.bind(this);

    this.room = new Room(0, this.ctx, this, this.canvas);
    this.hints = this.room.getHintsGame();

    this.borders = [];
    this.level = new Level1map(this.canvas, this.ctx);
    this.spawnCookie= new SpawnCookie(this.canvas,this.ctx,this.level.widthHall)
    this.darkSpots = new DarkSpot(0, this.ctx, this, this.canvas, this.level.widthHall);
    this.roomsIds = this.level.rooms;

    for (let i = 0; i < this.level.level1.length; i++) {
      const x = this.level.level1[i][0];
      const y = this.level.level1[i][1];
      const x2 = this.level.level1[i][2];
      const y2 = this.level.level1[i][3];
      this.borders.push(new Border(x, y, x2, y2, this.ctx, "normal"));
    }

    for (let i = 0; i < this.level.agentBorders.length; i++) {
      const x = this.level.agentBorders[i][0];
      const y = this.level.agentBorders[i][1];
      const x2 = this.level.agentBorders[i][2];
      const y2 = this.level.agentBorders[i][3];
      const type = this.level.agentBorders[i][4];
      this.borders.push(new Border(x, y, x2, y2, this.ctx, type));
    }
    // this.border= new Border(300,50,300,200,this.ctx)
    // this.ray=new Ray(50,150, this.ctx)

    // this.particle = new Particle(this.canvas.width / 2 - 12.5 * this.level.widthHall, 100 + 7.5 * this.level.widthHall, this.ctx);
    this.particle = new Particle(this.canvas.width / 2 + 4 * this.level.widthHall, 100 + 12.5 * this.level.widthHall, this.ctx);

    this.agents = this.sceneInfo.loadAgents(this.level.widthHall);

    //agent linksboven

    this.cameraAgents = this.sceneInfo.loadCameras(this.level.widthHall);

    this.keys.inPossesion[0] = true;
    this.keys.inPossesion[1] = true;
    this.keys.inPossesion[2] = true;
    this.keys.inPossesion[3] = true;
    this.mouse = { x: 0, y: 0 };

    // window.addEventListener("mousemove",this.mouseDown.bind(this), false)

    this.time = 0;
  }

  public getLevel() {
    return this.level;
  }

  public directorAlert(number: number) {
    let ctxAlert = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    if (number === 1) {
      ctxAlert.strokeStyle = "rgb(0,0,0)";
      ctxAlert.fillStyle = "rgb(255,0,0,0.5)";
      ctxAlert.beginPath();
      ctxAlert.rect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
      ctxAlert.closePath();
      ctxAlert.stroke();
      ctxAlert.fill();
    }

    ctxAlert.drawImage(this.testImg, 100 + this.trans.x * -1, 100 + this.trans.y * -1);
    ctxAlert.strokeStyle = "rgb(0,0,0)";
    ctxAlert.fillStyle = "rgb(255,255,255)";
    ctxAlert.beginPath();
    ctxAlert.rect(0 + this.trans.x * -1, 290 + this.trans.y * -1, 470, 50);
    ctxAlert.closePath();
    ctxAlert.stroke();
    ctxAlert.fill();

    ctxAlert.font = `30px sans-serif`;
    ctxAlert.fillStyle = "red";
    ctxAlert.textAlign = "left";
    ctxAlert.fillText("Directeur: M. Oney", 200 + this.trans.x * -1, 330 + this.trans.y * -1);

    ctxAlert.strokeStyle = "rgb(0,0,0)";
    ctxAlert.fillStyle = "rgb(255,255,255)";
    ctxAlert.beginPath();
    ctxAlert.ellipse(450 + this.trans.x * -1, 100 + this.trans.y * -1, 150, 140, Math.PI / 4, 0, 2 * Math.PI);
    ctxAlert.closePath();
    ctxAlert.stroke();
    ctxAlert.fill();
    this.writeTextToCanvas(`Er is een inbreker!`, 25, 450 + this.trans.x * -1, 100 + this.trans.y * -1);
    this.writeTextToCanvas(`Alle agenten opgelet!`, 25, 450 + this.trans.x * -1, 120 + this.trans.y * -1);
  }

  public checkKeyScene(e: any) {
    // console.log(e.keyCode-48)
    // if (e.keyCode >= 48 && e.keyCode <= 57 && this.insideRoom === false) {
    //   this.room.setRoomId(e.keyCode - 48);
    //   this.inRoomNum = e.keyCode - 48;
    //  // this.insideRoom = true;

    //   document.onkeydown = this.checkKeyScene.bind(this);
    // }
    if (e.keyCode === 49) {
      this.room.setRoomId(100);
      this.inRoomNum = 100;
      // this.insideRoom = true;

      document.onkeydown = this.checkKeyScene.bind(this);
    }
  }

  /**
   *
   */
  processInput() {}

  /**
   * @param e
   */
  mouseDown(e: MouseEvent) {
    // this.particle.update(window.event.clientX,window.event.clientY)
    this.mouse = this.camera.toWorld(e.clientX, e.clientY);
    //console.log(this.mouse)
  }

  public legalInsideRoom(): boolean {
    if (this.insideRoom && (this.room.visitedRooms[this.inRoomNum] != true || this.inRoomNum === 80 || this.inRoomNum === 100) && this.room.timeoutRooms[this.inRoomNum][1] != true) {
      return true;
    } else {
      return false;
    }
  }

  public checkCookie(elapsed:number){
    if(this.spawnCookie.eaten(this.particle.pos)){
      this.score.eatCookie()
    }
    if(this.spawnCookie.sleeping){
      if(this.spawnCookie.sleepTime>=30000){
        this.spawnCookie.sleepTime=0
        this.spawnCookie.sleeping=false
      }else{
        this.spawnCookie.sleepTime+=elapsed
      }
    }else{
      this.cookieTime+=elapsed
    }
    if(this.cookieTime>30000){
      this.spawnCookie.choosePos()
      this.cookieTime=0
    }

  }

  /**
   * update the scene
   *@param elapsed time passed
   */
  public update(elapsed: number): void {
   // this.elapsed += elapsed;
    if (this.legalInsideRoom()) {
      this.room.update(this.mouse.x, this.mouse.y, elapsed);
      document.onmousemove = this.mouseDown.bind(this);
      this.specialCasesMinigame();
    } else {
      this.checkCookie(elapsed)
      this.checkAgentAlert(elapsed)
      //tijd aftellen
      this.updateTime(elapsed);
      // transform canvas en camera
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.trans = this.camera.checkScaling(this.canvas, this.particle);
      this.camera.createMatrix(this.trans.x, this.trans.y, 0, 0);
      this.ctx.translate(this.trans.x, this.trans.y);
      //register mouse position to move the player
      document.onmousemove = this.mouseDown.bind(this);
      //Developers
      if (this.keyboard.isKeyDown(82)) {
        this.game.isEnd = true;
      }
      //
      //check in what room the player is if any
      this.isPlayerInRoom();
      //check if player is insight of agents
      this.isPlayerInSightAndUpdate(elapsed);
      //updateing player position
      this.particle.update(this.mouse.x, this.mouse.y, this.borders);
      this.particle.hack(this.agents);
      this.particle.animate();
      this.particle.move();
      //hack agents and retrieve keys
      this.playerHackAgents(elapsed);
      //timeout rooms
      this.room.timeOutRooms(elapsed);

      //update camerasAgent
      for (let i = 0; i < this.cameraAgents.length; i++) {
        this.cameraAgents[i].update();
        this.cameraAgents[i].look(this.borders, this.ctx);
      }
      this.isPlayerInSightCameras(elapsed);
      if (this.cameraLive !=  true) {
        this.countCameraTime++;
        if (this.countCameraTime >= 1000) {
          for (let i = 0; i < this.cameraAgents.length; i++) {

            this.cameraAgents[i].setActive()
        
        
        
          }
          this.cameraLive = true;
          this.countCameraTime = 0;
        }
      }
    }
  }

  /**
   *render the scene
   */
  public render(): void {
    if (this.legalInsideRoom()) {
      this.room.render();
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.imgFloor, 0, 0, this.imgFloor.width, this.imgFloor.height, 0, 0, this.canvas.width, this.canvas.height);
      // create dark spots
      this.darkSpots.createAll();

      //kamer1 background
      // this.ctx.drawImage(this.imgBank, 1000, 200, 2 * this.level.widthHall, 3 * this.level.widthHall, 100 + 5 * this.level.widthHall + 10, 100 + 2 * this.level.widthHall, 2 * this.level.widthHall, 3 * this.level.widthHall)

      this.sceneInfo.renderBackgroundImages(this.level.widthHall, this.imgBank);
      //show the player
      this.particle.show(false, "green");
      // show the borders
      for (let i = 0; i < this.borders.length; i++) {
        this.borders[i].show();
      }
      //show the agents
      for (let i = 0; i < this.agents.length; i++) {
        this.agents[i].show(this.ctx);
        this.agents[i].look(this.borders, this.ctx);
      }
      //show the room ids(rondjes)
      this.level.showRoomIds(this.room);

      //render agentcamera
      for (let i = 0; i < this.cameraAgents.length; i++) {
        this.cameraAgents[i].show(this.ctx);
      }
      
      if (this.count >=1000 && this.autoSearch === true) {
        for(let i=2;i<this.agents.length;i++){
          this.agents[i].updateMode("random");
        }
        this.autoSearch = false;
      }

      this.count++;

      //render info on top
      this.sceneInfo.renderInfo(this.userData.timeLimit, this.score.scoreProperty, this.userData.progress, this.hints, this.trans);

      //show the keys on top screen
      this.keys.show(this.ctx, this.trans);

      if(this.showAgentAlert){
        this.allAgentAlert();
      }
      
      this.spawnCookie.show()
    }
  }

  public checkAgentAlert(elapsed: number){
    if (this.elapsed >= 80000) {
      this.showAgentAlert=true
      this.elapsed+=elapsed
      
      if (this.elapsed >= 84000) {
        this.elapsed = 0;
        for(let i=2;i<this.agents.length;i++){
          this.agents[i].updateMode("search");
        }
        this.count = 0;
        this.autoSearch = true;

      }
    }else{
      this.elapsed+=elapsed
      this.showAgentAlert=false
    }

  }

  public allAgentAlert() {
      if (this.flash <= 20) {
        this.directorAlert(1);
        this.flash++;
      } else if (this.flash >= 50) {
        this.directorAlert(0);
        this.flash = 1;
      } else {
        this.directorAlert(0);
        this.flash++;
      }
    
  }

  public isPlayerInSightCameras(elapsed: number) {
    if(this.seenCameraTime>=10000){
      this.seenCamera=true
      this.seenCameraTime=0
    }else{
      this.seenCameraTime+=elapsed

    }
    for (let i = 0; i < this.cameraAgents.length; i++) {
      if (Vector.dist(this.particle.pos, this.cameraAgents[i].pos) < 200) {
        let inSight = this.cameraAgents[i].inSight(this.particle, this.ctx, this.borders);
        if (inSight) {
          //this.totalScore-=Scene.CAUGHT_AGENTS
          if(this.seenCamera){
            this.score.seenCameras();
            this.seenCamera=false

          }
         
          if (this.lockedUp === 2) {
            this.game.isEnd = true;
            this.howGameEnded = "caught";
          }
          this.sendAgents(this.cameraAgents[i].pos);
         
          break;
        }
      }
    }
  }

  

  public sendAgents(pos: Vector) {
    for (let i = 0; i < this.agents.length; i++) {
      let dist = Vector.dist(this.agents[i].pos, pos);
      if (dist < 600) {
        this.agents[i].newTarget(pos);
        this.agents[i].updateMode("camera");
      }
    }
  }

  public gethintGame() {
    return this.hints;
  }

  public getGame() {
    return this.game;
  }

  /**
   * check if player is in a room
   */
  public isPlayerInRoom() {
    let roomNum = this.particle.isInRoom(this.roomsIds);
    if (roomNum != -1 && (this.keys.total > 0 || roomNum === 80 || roomNum === 90) && this.room.timeoutRooms[roomNum][1] != true) {
      //player is inside a room or central hub
      this.insideRoom = true;
      this.inRoomNum = roomNum;
      this.room.setRoomId(this.inRoomNum);
    } else if (this.keyboard.isKeyDown(84)) {
      this.insideRoom = true;
      this.inRoomNum = 2;
      this.room.setRoomId(2);
    }
  }

  /**
   * if close enough, player hacks the agents
   * @param elapsed number
   */
  public playerHackAgents(elapsed: number) {
    if (this.particle.hackIndex < this.particle.hackRange && this.particle.hacking) {
      this.timeHacking += elapsed;
    } else if (!this.particle.hacking) {
      //this.timeHacking = 0;
      this.particle.hackIndex = 0;
    } else if (
      //this.timeHacking >= timeHack &&
      this.particle.hackIndex >= this.particle.hackRange &&
      this.agents[this.particle.hackAgent].sleeping === false
    ) {
      let key = this.agents[this.particle.hackAgent].keyNum;
      this.agents[this.particle.hackAgent].sleeping = true;
      this.keys.keys[key] = true;
      this.keys.total++;
      this.timeHacking = 0;
      this.particle.setHackIndex(0);
      this.agents[this.particle.hackAgent].updateAttributes();

      // console.log("hacked room num:" ,key)
      for (let i = 0; i < this.keys.keys.length; i++) {
        if (!this.keys.inPossesion[i]) {
          this.agents[this.particle.hackAgent].keyNum = i;
          this.keys.inPossesion[i] = true;
          break;
        }
      }
    }
  }

  /**
   * check if player is in sight of agents
   * @param elapsed number
   */
  public isPlayerInSightAndUpdate(elapsed: number) {
    for (let i = 0; i < this.agents.length; i++) {
      if (Vector.dist(this.particle.pos, this.agents[i].pos) < 80) {
        let inSight = this.agents[i].inSight(this.particle, this.ctx, this.borders);
        if (inSight) {
          //this.totalScore-=Scene.CAUGHT_AGENTS
          this.score.caughtAgents();
          if (this.lockedUp === 2) {
            this.game.isEnd = true;
            this.howGameEnded = "caught";
          }
          if (this.agents.length <= 5) {
            this.agents.push(new Agent(100 + 5 * this.level.widthHall, 100 + 0.5 * this.level.widthHall, this.ctx, this.level.widthHall, "random", this.agents.length, "yellow"));
          }
          //player in room
          // this.lockedUp++;
         this.particle.sendToJail(this.canvas,this.level.widthHall)
        }
      }

      //updateing and moving agents
      this.agents[i].updateTarget(this.canvas, this.level.widthHall, this.particle.pos, this.particle.vel);
      this.agents[i].update(this.borders);
      this.agents[i].animate();

      this.agents[i].move();
      //this.agents[i].look(this.borders,this.ctx)
      //check if agent is still inactive, increment sleeping time if still sleeping
      if (this.agents[i].sleepingTime >= 20000) {
        this.agents[i].sleepingTime = 0;
        this.agents[i].sleeping = false;
      } else {
        this.agents[i].sleepingTime += elapsed;
      }
    }
  }

  /**
   * update time
   * @param elapsed time passed since last frame
   */
  public updateTime(elapsed: number) {
    if (this.userData.timeLimit - elapsed >= 0) {
      this.userData.decreaseTimeLimit(elapsed);
    } else {
      this.game.isEnd = true;
    }
    // if (this.time >= 1000) {
    //   this.userData.decreaseTimeLimit(elapsed);
    //   this.time = 0;
    // } else {
    //   this.time += elapsed;
    // }
    //tijd om ? game over, score naar database
    // if (this.userData.timeLimit <= 0) {
    //   // this.scoreToDatabase.update(this.score.scoreProperty);
    //   this.game.isEnd = true;
    // }
  }

  /**
   * Check what room player came from and what happend in room
   */
  public specialCasesMinigame() {
    let isMiniGameComplete = this.room.checkDone();
    if (isMiniGameComplete === 0) {
      this.room.answer = false;
      this.room.miniGameFinished = false;
      //this.totalScore+=Scene.POINTS_WIN_MG;
      this.score.miniGameComplete(this.room.mgTimeLeft);
      this.keys.total--;
      this.hints.foundHintInScene(isMiniGameComplete);
    }

    if (isMiniGameComplete === -1) {
      //this.totalScore-=Scene.POINTS_LOSS_MG
      this.score.miniGameLossed();
      this.keys.total--;
    }

    if (isMiniGameComplete != 80 && isMiniGameComplete != 100 && isMiniGameComplete != 101 && isMiniGameComplete != 81 && isMiniGameComplete != 90 && isMiniGameComplete != false&&isMiniGameComplete!=-1) {
      this.room.answer = false;
      this.room.miniGameFinished = false;
      // this.totalScore++;
      this.score.miniGameComplete(this.room.mgTimeLeft);
      this.keys.total--;
      //isMiniGameComplete is de variable die het nummer van de minigame bevat als de minigame succesvol is afgerond
      this.hints.foundHintInScene(isMiniGameComplete);
    }
    if (isMiniGameComplete === 100) {
      //this.totalScore+=Scene.WIN_BOSSLEVEL
      this.score.winBossLevel();
      // this.scoreToDatabase.update(this.score.scoreProperty);
      this.room.answer = false;
      this.room.miniGameFinished = false;
      this.howGameEnded = "gekraakt";
      this.game.isEnd = true;
    } else if (isMiniGameComplete === 101) {
      // this.scoreToDatabase.update(this.score.scoreProperty);
      this.room.answer = false;
      this.room.miniGameFinished = false;
      this.howGameEnded = "outofattempts";
      this.game.isEnd = true;
      this.particle.pos.x = this.canvas.width / 2 + this.level.widthHall;
      this.particle.pos.y = 100 + 5 * this.level.widthHall + 20;
    } else if (isMiniGameComplete === 90) {
      this.room.answer = false;
      this.room.miniGameFinished = false;

      this.particle.pos.x = this.canvas.width / 2 - 18 * this.level.widthHall;
      this.particle.pos.y = 300 + 12.5 * this.level.widthHall;
    } else if (isMiniGameComplete === 80) {
      this.room.answer = false;
      this.room.miniGameFinished = false;
      this.particle.pos.x = this.canvas.width / 2 + 18.5 * this.level.widthHall;
      this.particle.pos.y = 100 + 2 * this.level.widthHall;
      this.lockedUp++;
    } else if (isMiniGameComplete === 81) {
      this.room.answer = false;
      this.room.miniGameFinished = false;
      this.particle.pos.x = this.canvas.width / 2 + 18.5 * this.level.widthHall;
      this.particle.pos.y = 100 + 2 * this.level.widthHall;
      this.lockedUp++;
    }
  }

  /**
   * @param text
   * @param xCoordinate
   * @param yCoordinate
   * @param fontSize
   * @param color
   * @param alignment
   */
  public writeTextToCanvas(text: string, fontSize: number = 20, xCoordinate: number, yCoordinate: number, alignment: CanvasTextAlign = "center", color: string = "red"): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
// # sourceMappingURL=Scene.js.map
