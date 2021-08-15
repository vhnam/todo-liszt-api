import jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  SESSION_EXPIRES_IN,
} from '../../config';

import {UserModel} from '../../models/UserModel';

class CreateToken {
  private _user: UserModel;

  constructor(user: UserModel) {
    this._user = user;
  }

  async exec() {
    const accessToken = jwt.sign({usr: this._user.id}, ACCESS_TOKEN_SECRET, {
      algorithm: 'HS512',
      expiresIn: Math.floor(1.01 * SESSION_EXPIRES_IN),
    });

    const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, {
      algorithm: 'HS512',
      expiresIn: 30 * SESSION_EXPIRES_IN,
    });

    return {
      accessToken,
      expiresIn: SESSION_EXPIRES_IN,
      tokenType: 'bearer',
      refreshToken,
    };
  }
}

const createToken = (user: UserModel) => {
  return new CreateToken(user).exec();
};

export default createToken;
