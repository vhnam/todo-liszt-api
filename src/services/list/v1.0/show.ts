import {Op} from 'sequelize';

import db from '../../../models';

interface IShow {
  id: string;
}

class Show {
  private _params: IShow;

  constructor(params: IShow) {
    this._params = params;
  }

  async exec() {
    const list = await db.List.findOne({
      where: {
        [Op.or]: [{id: this._params.id}],
      },
    });

    return list;
  }
}

const show = (params: IShow) => {
  return new Show(params).exec();
};

export default show;
