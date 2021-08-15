import {Op} from 'sequelize';
import {EMAIL_USERNAME, WEB_APP} from '../../config';

import db from '../../models';
import {UserModel} from '../../models/UserModel';
import {AppError, ErrorCode} from '../../utils/appError';

import EmailService from '../email';
import TokenService from '../token';

interface IForgotPassword {
  email: string;
}

class ForgotPassword {
  private _params: IForgotPassword;
  private _token: string | null;
  private _user: UserModel | null;

  constructor(params: IForgotPassword) {
    this._params = params;
    this._token = null;
    this._user = null;
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

  async _createToken() {
    this._token = await TokenService.create();
  }

  async _sendMail() {
    const link = `${WEB_APP}/reset-password?token=${this._token}`;

    const params = {
      from: EMAIL_USERNAME,
      to: this._params.email,
      subject: '[Todo Liszt] Forgot Password',
      html: `Click to this <a href="${link}">link</a> to reset password`,
    };

    await EmailService.create(params);
  }

  async exec() {
    await this._validateEmail();
    await this._createToken();
    await this._sendMail();
  }
}

const forgotPassword = (params: IForgotPassword) => {
  return new ForgotPassword(params).exec();
};

export default forgotPassword;
