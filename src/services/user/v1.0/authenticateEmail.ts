import bcrypt from 'bcryptjs';
import {Op} from 'sequelize';

import {AppError, ErrorCode} from '../../../utils/appError';

import db from '../../../models';
import {UserModel} from '../../../models/UserModel';

interface IAuthenticateEmail {
  email: string;
  password: string;
}

class AuthenticateEmail {
  private _params: IAuthenticateEmail;

  constructor(params: IAuthenticateEmail) {
    this._params = params;
  }

  async _validatePassword(user: UserModel) {
    return bcrypt.compare(this._params.password, user.password);
  }

  async exec() {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{email: this._params.email.toLowerCase()}],
        blockedAt: null,
      },
    });

    if (!user || !user.password) {
      throw new AppError(ErrorCode.Sessions.InvalidCredentials);
    }

    const isCorrectPassword = await this._validatePassword(user);

    if (!isCorrectPassword) {
      throw new AppError(ErrorCode.Sessions.InvalidCredentials);
    }

    return user;
  }
}

export default AuthenticateEmail;
