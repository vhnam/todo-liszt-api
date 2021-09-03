import {AppError, ErrorCode} from '../../../utils/appError';

import {Settings} from '../../../models';

interface ICreate {
  user: string;
  language: string;
  timezone: string;
  weekStart: string;
}

const create = async (params: ICreate) => {
  try {
    const _params = {
      user: params.user,
      language: params.language,
      timezone: params.timezone,
      weekStart: params.weekStart.toLowerCase(),
    };
    return await Settings.create(_params);
  } catch (error: any) {
    const details = error.errors.map((e: Error) => e.message);
    throw new AppError(ErrorCode.Settings.InvalidParameters, details);
  }
};

export default create;
