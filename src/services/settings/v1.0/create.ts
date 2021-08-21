import {AppError, ErrorCode} from '../../../utils/appError';

import db from '../../../models';
import {SettingsModel} from '../../../models/SettingsModel';

interface ICreate {
  user: string;
  language: string;
  timezone: string;
  weekStart: string;
}

class Create {
  private _params: ICreate;
  private _settings: SettingsModel | null;

  constructor(params: ICreate) {
    this._params = params;
    this._settings = null;
  }

  async _create() {
    try {
      const params = {
        user: this._params.user,
        language: this._params.language,
        timezone: this._params.timezone,
        weekStart: this._params.weekStart.toLowerCase(),
      };
      this._settings = await db.Settings.create(params);
    } catch (error) {
      const details = error.errors.map((e: Error) => e.message);
      throw new AppError(ErrorCode.Settings.InvalidParameters, details);
    }
  }

  async exec() {
    await this._create();
    return this._settings;
  }
}

const create = (params: ICreate) => {
  return new Create(params).exec();
};

export default create;
