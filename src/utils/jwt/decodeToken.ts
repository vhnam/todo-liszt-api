import jwt from 'jsonwebtoken';

import {ACCESS_TOKEN_SECRET} from '../../config';

import {IToken} from './types';

class DecodeToken {
  private _accessToken: string;

  constructor(accessToken: string) {
    this._accessToken = accessToken;
  }

  async exec() {
    const accessToken = jwt.verify(this._accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    }) as IToken;

    return accessToken;
  }
}

const decodeToken = (accessToken: string) => {
  return new DecodeToken(accessToken).exec();
};

export default decodeToken;
