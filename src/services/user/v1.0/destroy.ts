import {Op} from 'sequelize';

import db from '../../../models';

interface IDestroy {
  userID: string;
}

class Destroy {
  private _params: IDestroy;

  constructor(params: IDestroy) {
    this._params = params;
  }

  async exec() {
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
