import {AppError, ErrorCode} from '../../../utils/appError';

import {SubTask} from '../../../models';

interface ICreate {
  listID: string;
  name: string;
  description: string;
}

const create = async (params: ICreate) => {
  try {
    const subTask = await SubTask.create(params);
    return subTask;
  } catch (error: any) {
    const details = error.errors.map((e: Error) => e.message);
    throw new AppError(ErrorCode.SubTask.InvalidParameters, details);
  }
};

export default create;
