import {Op} from 'sequelize';

import {AppError, ErrorCode} from '../../../utils/appError';

import {List} from '../../../models';

interface IUpdate {
  id: string;
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  color: string;
}

const update = async (params: IUpdate) => {
  try {
    const _params = {
      name: params.name,
      description: params.description,
      startAt: params.startAt,
      endAt: params.endAt,
      color: params.color,
    };
    await List.update(_params, {
      where: {
        [Op.or]: [{id: params.id}],
      },
    });
  } catch (error: any) {
    const details = error.errors.map((e: Error) => e.message);
    throw new AppError(ErrorCode.List.InvalidParameters, details);
  }
};

export default update;
