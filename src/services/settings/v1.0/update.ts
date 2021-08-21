import {Op} from 'sequelize';

import {AppError, ErrorCode} from '../../../utils/appError';

import db from '../../../models';

interface IUpdate {
  user: string;
  language: string;
  timezone: string;
  weekStart: string;
}

class Update {
  private _params: IUpdate;

  constructor(params: IUpdate) {
    this._params = params;
  }

  async exec() {
    try {
      const params = {
        language: this._params.language,
        timezone: this._params.timezone,
        weekStart: this._params.weekStart,
      };
      await db.Settings.update(params, {
        where: {
          [Op.or]: [{user: this._params.user}],
        },
      });
    } catch (error) {
      const details = error.errors.map((e: Error) => e.message);
      throw new AppError(ErrorCode.Settings.InvalidParameters, details);
    }
  }
}

const update = (params: IUpdate) => {
  return new Update(params).exec();
};

export default update;
