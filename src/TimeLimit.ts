export default class TimeLimit {
  private passwordProperty: string;

  private timeLimitProperty: number;

  /**
   * Constructs...
   *
   * @param password the password.
   */
  constructor(password: string) {
    this.passwordProperty = password;
  }

  public get timeLimit(): number {
    return 10 * this.calculatePasswordStrength();
  }

  private set timeLimit(timeLimit: number) {
    this.timeLimitProperty = timeLimit;
  }

  /**
   * Method that calculates the strength of a password
   *
   * @returns the strength of the password
   */
  private calculatePasswordStrength(): number {
    return this.passwordProperty.length;
  }
}
