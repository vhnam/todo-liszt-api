import {AppError, ErrorCode} from '../../../utils/appError';

import {List} from '../../../models';

interface ICreate {
  user: string;
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  color: string;
}

const create = async (params: ICreate) => {
  try {
    const _params = {
      user: params.user,
      name: params.name,
      description: params.description,
      startAt: params.startAt,
      endAt: params.endAt,
      color: params.color,
    };
    const list = await List.create(_params);
    return list;
  } catch (error: any) {
    const details = error.errors.map((e: Error) => e.message);
    throw new AppError(ErrorCode.Settings.InvalidParameters, details);
  }
};

export default create;
