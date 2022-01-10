import KeyboardListener from "../KeyboardListener.js";
export default class MGMain {
    roomId;
    room;
    keyboard;
    constructor(roomId, room) {
        this.roomId = roomId;
        this.room = room;
        this.keyboard = new KeyboardListener();
    }
}
//# sourceMappingURL=MGMain.js.map