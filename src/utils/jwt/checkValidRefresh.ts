import jwt from 'jsonwebtoken';

import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from '../../config';

import {IToken} from './types';

class CheckValidRefresh {
  private _accessToken: string;
  private _refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
  }

  async exec() {
    const access = jwt.verify(this._accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    }) as IToken;

    const refresh = jwt.verify(
      this._refreshToken,
      REFRESH_TOKEN_SECRET,
    ) as IToken;

    return access.usr === refresh.usr;
  }
}

const checkValidRefresh = (accessToken: string, refreshToken: string) => {
  return new CheckValidRefresh(accessToken, refreshToken).exec();
};

export default checkValidRefresh;
