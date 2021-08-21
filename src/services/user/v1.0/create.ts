import bcrypt from 'bcryptjs';

import {AppError, ErrorCode} from '../../../utils/appError';

import db from '../../../models';
import {UserModel} from '../../../models/UserModel';

interface ICreate {
  email: string;
  password: string;
  role: string;
}

class Create {
  private _user: UserModel | null;

  private _params: ICreate;

  constructor({email, password, role = 'member'}: ICreate) {
    this._params = {
      email: email.toLowerCase(),
      password,
      role,
    };
    this._user = null;
  }

  async _createUser() {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(this._params.password, salt);

    try {
      const params = {
        email: this._params.email,
        password,
        role: this._params.role,
      };
      this._user = await db.User.create(params);
    } catch (error) {
      const details = error.errors.map((e: Error) => e.message);
      throw new AppError(ErrorCode.User.InvalidParameters, details);
    }
  }

  async _checkExistingUser() {
    const user = await db.User.findOne({
      where: {
        email: this._params.email,
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
