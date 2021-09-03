import db from '../../../models';
import {AppError, ErrorCode} from '../../../utils/appError';

interface ICreate {
  listID: string;
  name: string;
  description: string;
}

const create = async (params: ICreate) => {
  let subTask = null;

  try {
    subTask = await db.SubTask.create(params);
  } catch (error: any) {
    const details = error.errors.map((e: Error) => e.message);
    throw new AppError(ErrorCode.SubTask.InvalidParameters, details);
  }

  return subTask;
};

export default create;
