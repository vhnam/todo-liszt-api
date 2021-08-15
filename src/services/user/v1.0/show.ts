import {Op} from 'sequelize';

import db from '../../../models';

interface IShow {
  userID: string;
}

class Show {
  private _params: IShow;

  constructor(params: IShow) {
    this._params = params;
  }

  async exec() {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{id: this._params.userID}],
        blockedAt: null,
      },
    });

    return user;
  }
}

const show = (params: IShow) => {
  return new Show(params).exec();
};

export default show;
