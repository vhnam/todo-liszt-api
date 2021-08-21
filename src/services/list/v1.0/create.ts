import {AppError, ErrorCode} from '../../../utils/appError';

import db from '../../../models';
import {ListModel} from '../../../models/ListModel';

interface ICreate {
  user: string;
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  color: string;
}

class Create {
  private _params: ICreate;
  private _list: ListModel | null;

  constructor(params: ICreate) {
    this._params = params;
    this._list = null;
  }

  async _create() {
    try {
      const params = {
        user: this._params.user,
        name: this._params.name,
        description: this._params.description,
        startAt: this._params.startAt,
        endAt: this._params.endAt,
        color: this._params.color,
      };
      console.log(params);
      this._list = await db.List.create(params);
    } catch (error) {
      console.log(error.message);
      const details = error.errors.map((e: Error) => e.message);
      throw new AppError(ErrorCode.Settings.InvalidParameters, details);
    }
  }

  async exec() {
    await this._create();
    return this._list;
  }
}

const create = (params: ICreate) => {
  return new Create(params).exec();
};

export default create;
