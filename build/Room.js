import KeyboardListener from "./KeyboardListener.js";
import MiniGame0 from "./minigames/MiniGame0.js";
import MiniGame10 from "./minigames/MiniGame10.js";
import MiniGame11 from "./minigames/MiniGame11.js";
import MiniGame12 from "./minigames/MiniGame12.js";
import MiniGame13 from "./minigames/MiniGame13.js";
import MiniGame14 from "./minigames/MiniGame14.js";
import MiniGame1 from "./minigames/MiniGame1.js";
import MiniGame2 from "./minigames/MiniGame2.js";
import MiniGame3 from "./minigames/MiniGame3.js";
import MiniGame4 from "./minigames/MiniGame4.js";
import MiniGame5 from "./minigames/MiniGame5.js";
import MiniGame6 from "./minigames/MiniGame6.js";
import MiniGame7 from "./minigames/MiniGame7.js";
import MiniGame8 from "./minigames/MiniGame8.js";
import MiniGame9 from "./minigames/MiniGame9.js";
export default class Room {
    visitedRooms = [];
    roomId;
    ctx;
    keyboard;
    scene;
    minigame0;
    minigame1;
    minigame2;
    minigame3;
    minigame4;
    minigame5;
    minigame6;
    minigame7;
    minigame8;
    minigame9;
    minigame10;
    minigame11;
    minigame12;
    minigame13;
    minigame14;
    constructor(roomId, ctx, scene) {
        this.roomId = roomId;
        this.ctx = ctx;
        this.keyboard = new KeyboardListener();
        this.scene = scene;
        this.minigame0 = new MiniGame0(this.ctx, this);
        this.minigame1 = new MiniGame1(this.ctx, this);
        this.minigame2 = new MiniGame2(this.ctx, this);
        this.minigame3 = new MiniGame3(this.ctx, this);
        this.minigame4 = new MiniGame4(this.ctx, this);
        this.minigame5 = new MiniGame5(this.ctx, this);
        this.minigame6 = new MiniGame6(this.ctx, this);
        this.minigame7 = new MiniGame7(this.ctx, this);
        this.minigame8 = new MiniGame8(this.ctx, this);
        this.minigame9 = new MiniGame9(this.ctx, this);
        this.minigame10 = new MiniGame10(this.ctx, this);
        this.minigame11 = new MiniGame11(this.ctx, this);
        this.minigame12 = new MiniGame12(this.ctx, this);
        this.minigame13 = new MiniGame13(this.ctx, this);
        this.minigame14 = new MiniGame14(this.ctx, this);
        for (let i = 0; i < 16; i++) {
            this.visitedRooms[i] = false;
        }
    }
    update() {
        if (this.keyboard.isKeyDown(32)) {
            this.scene.insideRoom = false;
            this.visitsNew(this.roomId);
        }
        else if (this.roomId === 0) {
            this.minigame0.update();
        }
        else if (this.roomId === 1) {
            this.minigame1.update();
        }
        else if (this.roomId === 2) {
            this.minigame2.update();
        }
        else if (this.roomId === 3) {
            this.minigame3.update();
        }
        else if (this.roomId === 4) {
            this.minigame4.update();
        }
        else if (this.roomId === 5) {
            this.minigame5.update();
        }
        else if (this.roomId === 6) {
            this.minigame6.update();
        }
        else if (this.roomId === 7) {
            this.minigame7.update();
        }
        else if (this.roomId === 8) {
            this.minigame8.update();
        }
        else if (this.roomId === 9) {
            this.minigame9.update();
        }
        else if (this.roomId === 10) {
            this.minigame10.update();
        }
        else if (this.roomId === 11) {
            this.minigame11.update();
        }
        else if (this.roomId === 12) {
            this.minigame12.update();
        }
        else if (this.roomId === 13) {
            this.minigame13.update();
        }
        else if (this.roomId === 14) {
            this.minigame14.update();
        }
    }
    render() {
        this.writeTextToCanvas("press spacebar to leave room", 20, 300, 300);
        if (this.roomId === 0) {
            this.minigame0.render();
        }
        else if (this.roomId === 1) {
            this.minigame1.render();
        }
        else if (this.roomId === 2) {
            this.minigame2.render();
        }
        else if (this.roomId === 3) {
            this.minigame3.render();
        }
        else if (this.roomId === 4) {
            this.minigame4.render();
        }
        else if (this.roomId === 5) {
            this.minigame5.render();
        }
        else if (this.roomId === 6) {
            this.minigame6.render();
        }
        else if (this.roomId === 7) {
            this.minigame7.render();
        }
        else if (this.roomId === 8) {
            this.minigame8.render();
        }
        else if (this.roomId === 9) {
            this.minigame9.render();
        }
        else if (this.roomId === 10) {
            this.minigame10.render();
        }
        else if (this.roomId === 11) {
            this.minigame11.render();
        }
        else if (this.roomId === 12) {
            this.minigame12.render();
        }
        else if (this.roomId === 13) {
            this.minigame13.render();
        }
        else if (this.roomId === 14) {
            this.minigame14.render();
        }
    }
    setRoomId(roomId) {
        this.roomId = roomId;
    }
    visitsNew(roomId) {
        this.visitedRooms[roomId] = true;
        console.log(roomId, this.visitedRooms[roomId]);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Room.js.map