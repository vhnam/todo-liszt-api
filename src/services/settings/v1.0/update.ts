import {Op} from 'sequelize';

import {AppError, ErrorCode} from '../../../utils/appError';

import {Settings} from '../../../models';

interface IUpdate {
  user: string;
  language: string;
  timezone: string;
  weekStart: string;
}

const update = async (params: IUpdate) => {
  try {
    const _params = {
      language: params.language,
      timezone: params.timezone,
      weekStart: params.weekStart.toLowerCase(),
    };
    await Settings.update(_params, {
      where: {
        [Op.or]: [{user: params.user}],
      },
      individualHooks: true,
    });
  } catch (error: any) {
    const details = error.errors.map((e: Error) => e.message);
    throw new AppError(ErrorCode.Settings.InvalidParameters, details);
  }
};

export default update;
