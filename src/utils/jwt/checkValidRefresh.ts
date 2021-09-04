import jwt from 'jsonwebtoken';
import env from '../../env';

import {IToken} from './types';

class CheckValidRefresh {
  private _accessToken: string;
  private _refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
  }

  async exec() {
    const access = jwt.verify(this._accessToken, env.ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    }) as IToken;

    const refresh = jwt.verify(
      this._refreshToken,
      env.REFRESH_TOKEN_SECRET,
    ) as IToken;

    return access.usr === refresh.usr;
  }
}

const checkValidRefresh = (accessToken: string, refreshToken: string) => {
  return new CheckValidRefresh(accessToken, refreshToken).exec();
};

export default checkValidRefresh;
