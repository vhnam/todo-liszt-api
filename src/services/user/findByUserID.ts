import {Op} from 'sequelize';

import db from '../../models';

class FindByUserID {
  private _userID: string;

  constructor(userID: string) {
    this._userID = userID;
  }

  async exec() {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{id: this._userID}],
        blockedAt: null,
      },
    });

    return user;
  }
}

const findByUserID = (userID: string) => {
  return new FindByUserID(userID).exec();
};

export default findByUserID;
