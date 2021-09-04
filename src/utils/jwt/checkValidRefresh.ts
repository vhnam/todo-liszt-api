import jwt from 'jsonwebtoken';

import env from '../../env';

import {IToken} from './types';

const checkValidRefresh = (accessToken: string, refreshToken: string) => {
  const _accessToken = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET, {
    ignoreExpiration: true,
  }) as IToken;

  const _refreshToken = jwt.verify(
    refreshToken,
    env.REFRESH_TOKEN_SECRET,
  ) as IToken;

  return _accessToken.usr === _refreshToken.usr;
};

export default checkValidRefresh;
