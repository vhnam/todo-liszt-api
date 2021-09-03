import jwt from 'jsonwebtoken';

import env from '../../env';
import {UserModel} from '../../models/UserModel';

class CreateToken {
  private _user: UserModel;

  constructor(user: UserModel) {
    this._user = user;
  }

  async exec() {
    const accessToken = jwt.sign(
      {usr: this._user.id},
      env.ACCESS_TOKEN_SECRET,
      {
        algorithm: 'HS512',
        expiresIn: Math.floor(1.01 * env.SESSION_EXPIRES_IN),
      },
    );

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
  }
}

const createToken = (user: UserModel) => {
  return new CreateToken(user).exec();
};

export default createToken;
