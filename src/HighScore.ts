import InfoDisplay from './InformationDisplay.js';

export default class HighScore extends InfoDisplay {
  private highscore: number[];

  /**
   * Initialize an instance of this object
   *
   * @param canvas canvas
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }
}
