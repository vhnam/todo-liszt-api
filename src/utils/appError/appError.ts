import {IError} from './createError';

class AppError {
  private _errorCode: IError;
  private _prefix = 'tdl';
  private _details: string[];

  constructor(errorCode: IError, details: string[] = []) {
    this._errorCode = errorCode;
    this._details = details;
  }

  _code() {
    const service = `0${this._errorCode.service}`.slice(-2);
    const code = `0${this._errorCode.code}`.slice(-2);
    return `${this._prefix}${this._errorCode.http}${service}${code}`;
  }

  get status() {
    return this._errorCode.http;
  }

  get code() {
    return this._code();
  }

  get message() {
    return this._errorCode.message;
  }

  get details() {
    return this._details;
  }
}

export default AppError;
