import {Op} from 'sequelize';

import db from '../../../models';

interface IFindByUserID {
  userID: string;
}

class FindByUserID {
  private _params: IFindByUserID;

  constructor(params: IFindByUserID) {
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

const findByUserID = (params: IFindByUserID) => {
  return new FindByUserID(params).exec();
};

export default findByUserID;
