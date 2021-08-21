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
    const user = await db.Settings.findOne({
      where: {
        [Op.or]: [{user: this._params.userID}],
      },
    });

    return user;
  }
}

const show = (params: IShow) => {
  return new Show(params).exec();
};

export default show;
