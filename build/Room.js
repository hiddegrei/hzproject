import KeyboardListener from "./KeyboardListener.js";
export default class Room {
    roomId;
    ctx;
    keyboard;
    scene;
    constructor(roomId, ctx, scene) {
        this.roomId = roomId;
        this.ctx = ctx;
        this.keyboard = new KeyboardListener();
        this.scene = scene;
    }
}
//# sourceMappingURL=Room.js.map