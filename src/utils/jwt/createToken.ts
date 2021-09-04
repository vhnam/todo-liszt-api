import jwt from 'jsonwebtoken';

import env from '../../env';

import {User} from '../../models';

const createToken = (user: User) => {
  const accessToken = jwt.sign({usr: user.id}, env.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS512',
    expiresIn: Math.floor(1.01 * env.SESSION_EXPIRES_IN),
  });

  const refreshToken = jwt.sign({}, env.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS512',
    expiresIn: 30 * env.SESSION_EXPIRES_IN,
  });

  return {
    accessToken,
    expiresIn: env.SESSION_EXPIRES_IN,
    tokenType: 'bearer',
    refreshToken,
  };
};

export default createToken;
