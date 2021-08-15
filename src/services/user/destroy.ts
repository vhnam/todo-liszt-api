import {Op} from 'sequelize';

import db from '../../models';
import {AppError, ErrorCode} from '../../utils/appError';

interface IDestroy {
  userID: string;
}

class Destroy {
  private _params: IDestroy;

  constructor(params: IDestroy) {
    this._params = params;
  }

  async _validateUser() {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{id: this._params.userID}],
        blockedAt: null,
      },
    });

    if (!user) {
      throw new AppError(ErrorCode.User.NotFound);
    }
  }

  async exec() {
    await this._validateUser();

    await db.User.update(
      {
        blockedAt: new Date(),
      },
      {
        where: {
          [Op.or]: [{id: this._params.userID}],
        },
      },
    );
  }
}

const destroy = (params: IDestroy) => {
  return new Destroy(params).exec();
};

export default destroy;
