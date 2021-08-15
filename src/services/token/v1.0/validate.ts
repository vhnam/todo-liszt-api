import {Op} from 'sequelize';

import {AppError, ErrorCode} from '../../../utils/appError';

import db from '../../../models';

class Create {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  async _getToken() {
    const token = await db.Token.findOne({
      where: {
        [Op.or]: [{token: this._token}],
      },
    });
    return token;
  }

  async _blockToken() {
    const now = new Date();
    await db.Token.update(
      {
        blockedAt: now,
        usedAt: now,
      },
      {
        where: {
          [Op.or]: [{token: this._token}],
        },
      },
    );
  }

  async _confirmValidToken() {
    await db.Token.update(
      {
        usedAt: new Date(),
      },
      {
        where: {
          [Op.or]: [{token: this._token}],
        },
      },
    );
  }

  async exec() {
    const token = await this._getToken();

    if (!token) {
      throw new AppError(ErrorCode.User.InvalidRefreshPasswordToken);
    }

    const expireAt = token.expireAt.getTime();

    if (token.usedAt || Date.now() > expireAt) {
      await this._blockToken();
      throw new AppError(ErrorCode.User.InvalidRefreshPasswordToken);
    }

    await this._confirmValidToken();
  }
}

const create = (token: string) => {
  return new Create(token).exec();
};

export default create;
