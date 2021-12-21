import PasswordMeter from './PasswordStrengthChecker.js';

export default class TimeLimit {
  private passwordProperty: string;

  private passwordStrengthProperty: number;

  /**
   * Constructs...
   *
   * @param password the password.
   */
  public constructor(password: string) {
    this.passwordProperty = password;
    this.passwordStrengthProperty = new PasswordMeter().getResult(password).score;
  }

  public get password(): string {
    return this.passwordProperty;
  }

  public get timeLimit(): any {
    return 5 * this.passwordStrengthProperty;
  }
}
