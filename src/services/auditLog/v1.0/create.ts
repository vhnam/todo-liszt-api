import {AppError, ErrorCode} from '../../../utils/appError';

import {AuditLog} from '../../../models';

interface ICreate {
  actionBy: string;
  module: string;
  requestMethod: string;
  requestUrl: string;
  data: Record<string, any>;
}

const create = async (params: ICreate) => {
  try {
    const auditLog = await AuditLog.create(params);
    return auditLog;
  } catch (error: any) {
    const details = error.errors.map((e: Error) => e.message);
    throw new AppError(ErrorCode.AuditLog.InvalidParameters, details);
  }
};

export default create;
