export default class PlaySound {
    private ding: HTMLAudioElement;

    private buzzer: HTMLAudioElement;

    public constructor() {
        this.ding = new Audio('./sound/ding.mp3')
        this.buzzer = new Audio('./sound/buzzer.mp3')
    }

    public correctAnswer() {
        this.ding.play();
    }

    public wrongAnswer() {
        this.buzzer.play();
    }
}