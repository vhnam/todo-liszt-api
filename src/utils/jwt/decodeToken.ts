import jwt from 'jsonwebtoken';

import env from '../../env';

import {IToken} from './types';

const decodeToken = (accessToken: string) => {
  const _accessToken = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET, {
    ignoreExpiration: true,
  }) as IToken;

  return _accessToken;
};

export default decodeToken;
