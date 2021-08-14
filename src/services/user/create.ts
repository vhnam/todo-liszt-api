import bcrypt from 'bcryptjs';

import db from '../../models';
import { UserModel } from '../../models/UserModel';

import {AppError, ErrorCode} from '../../utils/appError';

interface ICreate {
  email: string;
  password: string;
}

class Create {
  private _email: string;
  private _password: string;
  private _user: UserModel | null;

  constructor({email, password}: ICreate) {
    this._email = email.toLowerCase();
    this._password = password;
    this._user = null;
  }

  async _createUser() {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(this._password, salt);

    try {
      const params = {
        email: this._email,
        password,
      };
      this._user = await db.User.create(params);
    } catch (error) {
      const details = error.errors.map((e: Error) => e.message);
      throw new AppError(ErrorCode.General.InvalidParameters, details);
    }
  }

  async _checkExistingUser() {
    const user = await db.User.findOne({
      where: {
        email: this._email,
      },
    });

    if (user) {
      throw new AppError(ErrorCode.User.EmailTaken);
    }
  }

  async exec() {
    await this._checkExistingUser();
    await this._createUser();
    return this._user;
  }
}

const create = (params: ICreate) => {
  return new Create(params).exec();
};

export default create;
