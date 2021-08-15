import {Op} from 'sequelize';
import bcrypt from 'bcryptjs';

import db from '../../models';
import {UserModel} from '../../models/UserModel';
import {AppError, ErrorCode} from '../../utils/appError';

import TokenService from '../token';

interface IResetPassword {
  email: string;
  password: string;
  token: string;
}

class ResetPassword {
  private _params: IResetPassword;
  private _user: UserModel | null;

  constructor(params: IResetPassword) {
    this._params = params;
    this._user = null;
  }

  async _validateToken() {
    await TokenService.validate(this._params.token);
  }

  async _validateEmail() {
    this._user = await db.User.findOne({
      where: {
        [Op.or]: [{email: this._params.email}],
        blockedAt: null,
      },
    });

    if (!this._user) {
      throw new AppError(ErrorCode.User.EmailNotDefined);
    }
  }

  async _updatePassword() {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(this._params.password, salt);

    await db.User.update(
      {
        password,
        updatedAt: new Date(),
      },
      {
        where: {
          [Op.or]: [{email: this._params.email}],
        },
      },
    );
  }

  async exec() {
    await this._validateToken();
    await this._validateEmail();
    await this._updatePassword();
  }
}

const resetPassword = (params: IResetPassword) => {
  return new ResetPassword(params).exec();
};

export default resetPassword;
