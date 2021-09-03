import bcrypt from 'bcryptjs';
import {nanoid} from 'nanoid';
import {addSeconds} from 'date-fns';

import db from '../../../models';
import env from '../../../env';

class Create {
  private _nanoid: string;
  private _token: string | null;

  constructor() {
    this._nanoid = nanoid();
    this._token = null;
  }

  async _generateToken() {
    const salt = await bcrypt.genSalt();
    this._token = await bcrypt.hash(this._nanoid, salt);
  }

  async _saveToken() {
    const expireAt = addSeconds(Date.now(), env.EMAIL_EXPIRES_IN);

    const params = {
      token: this._token,
      expireAt: expireAt.getTime(),
    };

    await db.Token.create(params);
  }

  async exec() {
    await this._generateToken();
    await this._saveToken();

    return this._token;
  }
}

const create = () => {
  return new Create().exec();
};

export default create;
