import jwt from 'jsonwebtoken';

import env from '../../env';

import {IToken} from './types';

class DecodeToken {
  private _accessToken: string;

  constructor(accessToken: string) {
    this._accessToken = accessToken;
  }

  async exec() {
    const accessToken = jwt.verify(this._accessToken, env.ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    }) as IToken;

    return accessToken;
  }
}

const decodeToken = (accessToken: string) => {
  return new DecodeToken(accessToken).exec();
};

export default decodeToken;
