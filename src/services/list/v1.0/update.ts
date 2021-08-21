import {Op} from 'sequelize';

import {AppError, ErrorCode} from '../../../utils/appError';

import db from '../../../models';

interface IUpdate {
  id: string;
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  color: string;
}

class Update {
  private _params: IUpdate;

  constructor(params: IUpdate) {
    this._params = params;
  }

  async exec() {
    try {
      const params = {
        name: this._params.name,
        description: this._params.description,
        startAt: this._params.startAt,
        endAt: this._params.endAt,
        color: this._params.color,
      };
      await db.List.update(params, {
        where: {
          [Op.or]: [{id: this._params.id}],
        },
      });
    } catch (error) {
      const details = error.errors.map((e: Error) => e.message);
      throw new AppError(ErrorCode.List.InvalidParameters, details);
    }
  }
}

const update = (params: IUpdate) => {
  return new Update(params).exec();
};

export default update;
