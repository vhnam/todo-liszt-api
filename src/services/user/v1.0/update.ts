import {Op} from 'sequelize';
import bcrypt from 'bcryptjs';

import db from '../../../models';

interface IUpdate {
  userID: string;
  name: string;
  password: string;
}

class Update {
  private _params: IUpdate;

  constructor(params: IUpdate) {
    this._params = params;
  }

  async exec() {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(this._params.password, salt);

    await db.User.update(
      {
        name: this._params.name,
        password,
      },
      {
        where: {
          [Op.or]: [{id: this._params.userID}],
        },
      },
    );
  }
}

const update = (params: IUpdate) => {
  return new Update(params).exec();
};

export default update;
