export class BaseAppException extends Error {
  public message = 'Something went wrong!';

  constructor(message?: string) {
    const msgVal = message || 'Something wrong';
    super(msgVal);
    this.message = msgVal;
  }
}