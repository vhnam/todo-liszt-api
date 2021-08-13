import bcrypt from 'bcryptjs';
import {Op} from 'sequelize';

import db, {UserModel} from '../../models';

interface IAuthenticateEmail {
  email: string;
  password: string;
}

class AuthenticateEmail {
  private _email: string;
  private _password: string;

  constructor(params: IAuthenticateEmail) {
    this._email = params.email;
    this._password = params.password;
  }

  async _validatePassword(user: UserModel) {
    return bcrypt.compare(this._password, user.password);
  }

  async exec() {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{email: this._email.toLowerCase()}],
        blockedAt: null,
      },
    });

    if (!user || !user.password) {
      throw new Error('Invalid Credentials');
    }

    const isCorrectPassword = await this._validatePassword(user);

    if (!isCorrectPassword) {
      throw new Error('Invalid Credentials');
    }

    return user;
  }
}

export default AuthenticateEmail;
