import KeyboardListener from "./KeyboardListener.js";
export default class Room {
    visitedRooms = [];
    roomId;
    ctx;
    keyboard;
    scene;
    constructor(roomId, ctx, scene) {
        this.roomId = roomId;
        this.ctx = ctx;
        this.keyboard = new KeyboardListener();
        this.scene = scene;
        for (let i = 0; i < 16; i++) {
            this.visitedRooms[i] = false;
        }
    }
    update() {
        if (this.keyboard.isKeyDown(32)) {
            this.scene.insideRoom = false;
            this.visitsNew(this.roomId);
        }
    }
    render() {
        this.writeTextToCanvas(`room: ${this.roomId}`, 20, 100, 100);
        this.writeTextToCanvas("press spacebar to leave room", 20, 300, 300);
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